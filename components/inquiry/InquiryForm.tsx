"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCheck, Compass, Feather, LoaderCircle, Sparkles } from "lucide-react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquiryBudgets, inquiryContent as copy, inquiryDestinations, inquiryInterests } from "@/content/inquiry";
import { inquiryDefaultValues, inquirySchema, inquiryStepFields, type InquiryData } from "@/lib/inquiry";

const inputClass = "w-full rounded-xl border border-beige bg-ivory px-4 py-3.5 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink-soft/70 focus:border-sea-deep focus:ring-2 focus:ring-sea-deep/20 aria-[invalid=true]:border-[#9C4E3A]";
const labelClass = "mb-2 block text-sm font-medium text-ink";

const fieldLabels: Partial<Record<keyof InquiryData, string>> = {
  destination: copy.destination.label,
  departureDate: copy.departureDate,
  returnDate: copy.returnDate,
  travelers: copy.travelers.label,
  budget: copy.budget.label,
  interests: copy.interests.label,
  name: copy.name.label,
  email: copy.email.label,
  phone: copy.phone.label,
  notes: copy.notes.label,
};

function FieldError({ name, errors }: { name: keyof InquiryData; errors: FieldErrors<InquiryData> }) {
  const message = errors[name]?.message;
  return message ? <p id={`inquiry-${name}-error`} className="mt-2 text-xs leading-relaxed text-[#8A432F]">{String(message)}</p> : null;
}

export function InquiryForm() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState<InquiryData | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [focusTarget, setFocusTarget] = useState<keyof InquiryData | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: inquiryDefaultValues,
    mode: "onTouched",
    shouldUnregister: false,
    shouldFocusError: true,
  });
  const flexibility = useWatch({ control, name: "flexibility" });
  const interests = useWatch({ control, name: "interests" });
  const currentErrors = inquiryStepFields[step].filter((field) => errors[field]);

  useEffect(() => {
    if (!focusTarget) return;
    const frame = window.requestAnimationFrame(() => {
      setFocus(focusTarget);
      setFocusTarget(null);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [focusTarget, setFocus, step]);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  async function nextStep() {
    const valid = await trigger(inquiryStepFields[step], { shouldFocus: true });
    if (!valid) return;
    setSubmitError("");
    setStep((value) => Math.min(value + 1, 2));
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  function invalidSubmit(formErrors: FieldErrors<InquiryData>) {
    const firstStep = inquiryStepFields.findIndex((fields) => fields.some((field) => formErrors[field]));
    if (firstStep < 0) return;
    setStep(firstStep);
    setFocusTarget(inquiryStepFields[firstStep].find((field) => formErrors[field]) ?? null);
  }

  async function submit(data: InquiryData) {
    setSubmitError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { accepted?: boolean; mode?: string; fields?: Partial<Record<keyof InquiryData, string[]>> };
      if (!response.ok || !result.accepted || result.mode !== "demo") {
        if (result.fields) {
          const serverErrors: FieldErrors<InquiryData> = {};
          for (const field of Object.keys(inquiryDefaultValues) as (keyof InquiryData)[]) {
            const message = result.fields[field]?.[0];
            if (message) {
              setError(field, { type: "server", message });
              serverErrors[field] = { type: "server", message };
            }
          }
          invalidSubmit(serverErrors);
        }
        setSubmitError(copy.serverError);
        return;
      }
      setSubmitted(data);
    } catch {
      setSubmitError(copy.networkError);
    }
  }

  function startAgain() {
    reset(inquiryDefaultValues);
    setStep(0);
    setSubmitted(null);
    setSubmitError("");
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }

  return (
    <section id="plan-your-trip" aria-labelledby="inquiry-title" className="section-space scroll-mt-28 bg-sand">
      <div className="container-shell grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-36">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="inquiry-title" className="section-heading mt-5 max-w-lg">{copy.heading} <em className="font-normal text-sea-deep">{copy.headingEmphasis}</em></h2>
          <p className="body-copy mt-6 max-w-md">{copy.description}</p>
          <div className="mt-9 space-y-6">
            {copy.promises.map((promise, index) => {
              const Icon = index === 0 ? Compass : Feather;
              return <div key={promise.title} className="flex max-w-md gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-beige bg-ivory/60 text-sea-deep"><Icon size={19} strokeWidth={1.5} aria-hidden="true" /></span>
                <div><h3 className="text-sm font-medium text-ink">{promise.title}</h3><p className="mt-1 text-sm leading-relaxed text-ink-soft">{promise.text}</p></div>
              </div>;
            })}
          </div>
          <p className="mt-10 flex items-center gap-2.5 font-display text-xl italic text-ink-soft"><Sparkles size={16} strokeWidth={1.5} className="text-sea-deep" aria-hidden="true" />{copy.asideNote}</p>
        </div>

        <div className="rounded-3xl border border-beige bg-ivory p-5 shadow-[0_20px_60px_-20px_rgba(43,42,40,0.12)] sm:p-9 lg:p-10">
          {submitted ? (
            <motion.div initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[500px] flex-col justify-center py-5">
              <span className="mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-sand text-sea-deep"><CheckCheck size={28} strokeWidth={1.4} aria-hidden="true" /></span>
              <p className="eyebrow">{copy.success.eyebrow}</p>
              <h3 ref={successRef} tabIndex={-1} className="mt-4 font-display text-4xl leading-tight text-ink outline-none sm:text-5xl">{copy.success.title}</h3>
              <p className="mt-5 text-sm leading-7 text-ink-soft">{copy.success.description}</p>
              <dl className="my-8 grid grid-cols-2 gap-6 border-y border-beige py-5">
                <div><dt className="text-xs text-ink-soft">{copy.success.destination}</dt><dd className="mt-2 font-medium text-ink">{submitted.destination === "open" ? copy.success.open : inquiryDestinations.find((destination) => destination.value === submitted.destination)?.label}</dd></div>
                <div><dt className="text-xs text-ink-soft">{copy.success.travelers}</dt><dd className="mt-2 font-medium text-ink">{submitted.travelers}</dd></div>
              </dl>
              <button type="button" onClick={startAgain} className="button-secondary self-start">{copy.success.restart}<ArrowRight size={16} aria-hidden="true" /></button>
            </motion.div>
          ) : (
            <form noValidate onSubmit={(event) => {
              if (step < 2) {
                event.preventDefault();
                void nextStep();
              } else {
                void handleSubmit(submit, invalidSubmit)(event);
              }
            }}>
              <ol aria-label="Trip inquiry progress" className="mb-8 flex items-center border-b border-beige pb-7">
                {copy.steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className="flex flex-1 items-center gap-2 last:flex-none">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${index <= step ? "border-ink bg-ink text-ivory" : "border-beige text-ink-soft"}`} aria-hidden="true">{index < step ? <Check size={14} /> : `0${index + 1}`}</span>
                  <span className={`${index === step ? "text-ink" : "text-ink-soft"} text-[11px] font-medium sm:text-xs ${index !== step ? "sr-only sm:not-sr-only" : ""}`}>{label}</span>
                  {index < 2 && <span aria-hidden="true" className="mx-1 h-px min-w-2 flex-1 bg-beige sm:mx-3" />}
                </li>)}
              </ol>

              <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
                <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl text-ink outline-none sm:text-4xl">{copy.steps[step]}</h3>
                <p className="text-[10px] text-ink-soft">{copy.requiredNote}</p>
              </div>

              {currentErrors.length > 0 && <div role="alert" className="mb-6 rounded-xl border border-[#C6927D] bg-[#FCF2EC] p-4 text-sm text-[#8A432F]">
                <p className="font-medium">{copy.errorHeading}</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                  {currentErrors.map((field) => <li key={field}><button className="text-left underline underline-offset-4" type="button" onClick={() => setFocus(field)}>{fieldLabels[field] ?? field}: {String(errors[field]?.message ?? "Review this field.")}</button></li>)}
                </ul>
              </div>}

              <motion.div key={step} initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.22 }} className="space-y-6">
                {step === 0 && <>
                  <div>
                    <label htmlFor="inquiry-destination" className={labelClass}>{copy.destination.label} *</label>
                    <select id="inquiry-destination" required {...register("destination")} aria-invalid={Boolean(errors.destination)} aria-describedby={errors.destination ? "inquiry-destination-error" : undefined} className={inputClass}>
                      <option value="">{copy.destination.placeholder}</option>
                      {inquiryDestinations.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <FieldError name="destination" errors={errors} />
                  </div>
                  <fieldset aria-describedby="inquiry-date-hint">
                    <legend className={labelClass}>{copy.flexibility.label} *</legend>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {copy.flexibility.options.map((option) => <label key={option.value} className="relative cursor-pointer">
                        <input type="radio" required value={option.value} {...register("flexibility")} className="peer sr-only" />
                        <span className="flex min-h-12 items-center justify-center rounded-xl border border-beige px-2 py-3 text-center text-xs text-ink-soft transition-colors peer-checked:border-sea-deep peer-checked:bg-sea/10 peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-sea-deep peer-focus-visible:ring-offset-2">{option.label}</span>
                      </label>)}
                    </div>
                    <p id="inquiry-date-hint" className="mt-3 text-xs leading-relaxed text-ink-soft">{copy.flexibility.hint}</p>
                  </fieldset>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inquiry-departureDate" className={labelClass}>{copy.departureDate}{flexibility === "fixed" ? " *" : ""}</label>
                      <input id="inquiry-departureDate" type="date" required={flexibility === "fixed"} {...register("departureDate")} aria-invalid={Boolean(errors.departureDate)} aria-describedby={`inquiry-date-hint${errors.departureDate ? " inquiry-departureDate-error" : ""}`} className={`${inputClass} min-w-0`} />
                      <FieldError name="departureDate" errors={errors} />
                    </div>
                    <div>
                      <label htmlFor="inquiry-returnDate" className={labelClass}>{copy.returnDate}{flexibility === "fixed" ? " *" : ""}</label>
                      <input id="inquiry-returnDate" type="date" required={flexibility === "fixed"} {...register("returnDate")} aria-invalid={Boolean(errors.returnDate)} aria-describedby={`inquiry-date-hint${errors.returnDate ? " inquiry-returnDate-error" : ""}`} className={`${inputClass} min-w-0`} />
                      <FieldError name="returnDate" errors={errors} />
                    </div>
                  </div>
                </>}

                {step === 1 && <>
                  <div>
                    <label htmlFor="inquiry-travelers" className={labelClass}>{copy.travelers.label} *</label>
                    <input id="inquiry-travelers" type="number" required min={1} max={24} step={1} inputMode="numeric" {...register("travelers", { valueAsNumber: true })} aria-invalid={Boolean(errors.travelers)} aria-describedby={`inquiry-travelers-hint${errors.travelers ? " inquiry-travelers-error" : ""}`} className={`${inputClass} max-w-32`} />
                    <p id="inquiry-travelers-hint" className="mt-2 text-xs leading-relaxed text-ink-soft">{copy.travelers.hint}</p>
                    <FieldError name="travelers" errors={errors} />
                  </div>
                  <div>
                    <label htmlFor="inquiry-budget" className={labelClass}>{copy.budget.label} *</label>
                    <select id="inquiry-budget" required {...register("budget")} aria-invalid={Boolean(errors.budget)} aria-describedby={`inquiry-budget-hint${errors.budget ? " inquiry-budget-error" : ""}`} className={inputClass}>
                      <option value="">{copy.budget.placeholder}</option>
                      {inquiryBudgets.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <p id="inquiry-budget-hint" className="mt-2 text-xs leading-relaxed text-ink-soft">{copy.budget.hint}</p>
                    <FieldError name="budget" errors={errors} />
                  </div>
                  <fieldset aria-describedby="inquiry-interests-hint">
                    <legend className={labelClass}>{copy.interests.label}</legend>
                    <p id="inquiry-interests-hint" className="mb-3 text-xs text-ink-soft">{copy.interests.hint}</p>
                    <div className="flex flex-wrap gap-2">
                      {inquiryInterests.map((interest) => {
                        const active = interests.includes(interest);
                        return <button key={interest} type="button" aria-pressed={active} onClick={() => setValue("interests", active ? interests.filter((value) => value !== interest) : [...interests, interest], { shouldDirty: true, shouldTouch: true, shouldValidate: true })} className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs transition-colors ${active ? "border-sea-deep bg-sea/15 text-ink" : "border-beige text-ink-soft hover:border-taupe hover:text-ink"}`}>{active && <Check size={12} aria-hidden="true" />}{interest}</button>;
                      })}
                    </div>
                    <FieldError name="interests" errors={errors} />
                  </fieldset>
                </>}

                {step === 2 && <>
                  <div>
                    <label htmlFor="inquiry-name" className={labelClass}>{copy.name.label} *</label>
                    <input id="inquiry-name" required autoComplete="name" maxLength={100} placeholder={copy.name.placeholder} {...register("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "inquiry-name-error" : undefined} className={inputClass} />
                    <FieldError name="name" errors={errors} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="inquiry-email" className={labelClass}>{copy.email.label} *</label>
                      <input id="inquiry-email" type="email" required autoComplete="email" maxLength={254} placeholder={copy.email.placeholder} {...register("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "inquiry-email-error" : undefined} className={inputClass} />
                      <FieldError name="email" errors={errors} />
                    </div>
                    <div>
                      <label htmlFor="inquiry-phone" className={labelClass}>{copy.phone.label} <span className="ml-1 text-[10px] font-normal text-ink-soft">{copy.phone.optional}</span></label>
                      <input id="inquiry-phone" type="tel" autoComplete="tel" maxLength={40} placeholder={copy.phone.placeholder} {...register("phone")} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "inquiry-phone-error" : undefined} className={inputClass} />
                      <FieldError name="phone" errors={errors} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="inquiry-notes" className={labelClass}>{copy.notes.label}</label>
                    <textarea id="inquiry-notes" rows={4} maxLength={2000} placeholder={copy.notes.placeholder} {...register("notes")} aria-invalid={Boolean(errors.notes)} aria-describedby={`inquiry-notes-hint${errors.notes ? " inquiry-notes-error" : ""}`} className={`${inputClass} resize-y leading-relaxed`} />
                    <p id="inquiry-notes-hint" className="mt-2 text-xs text-ink-soft">{copy.notes.hint}</p>
                    <FieldError name="notes" errors={errors} />
                  </div>
                  <p className="text-xs leading-relaxed text-ink-soft">{copy.privacyNote}</p>
                </>}
              </motion.div>

              <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="inquiry-website">{copy.honeypot}</label>
                <input id="inquiry-website" autoComplete="off" tabIndex={-1} {...register("website")} />
              </div>

              {submitError && <p role="alert" className="mt-5 rounded-xl border border-[#C6927D] bg-[#FCF2EC] p-4 text-sm leading-relaxed text-[#8A432F]">{submitError}</p>}

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-beige pt-6">
                {step > 0 ? <button type="button" onClick={() => { setStep((value) => value - 1); setSubmitError(""); window.requestAnimationFrame(() => headingRef.current?.focus()); }} disabled={isSubmitting} className="inline-flex min-h-11 items-center gap-2 px-1 text-sm text-ink-soft transition-colors hover:text-ink disabled:opacity-50"><ArrowLeft size={16} aria-hidden="true" />{copy.back}</button> : <span className="text-xs text-ink-soft" aria-hidden="true">01 / 03</span>}
                <button type="submit" disabled={isSubmitting} className="button-primary gap-2 disabled:cursor-wait disabled:opacity-60">
                  {isSubmitting ? <><LoaderCircle size={16} className={reduceMotion ? "" : "animate-spin"} aria-hidden="true" />{copy.submitting}</> : <>{step < 2 ? copy.next : copy.submit}<ArrowRight size={16} aria-hidden="true" /></>}
                </button>
              </div>
              <p className="mt-5 text-[10px] leading-relaxed text-ink-soft">{copy.demoNote}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

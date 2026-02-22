import React, { useState } from "react";
import { Text } from "../../common";
import { FormBuilder } from "../../controls";
import { FormControl } from "../../controls";
import { Page, Section } from "../../layout";

// ─── Demo: Contact form ───────────────────────────────────────────────────────

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  message: string;
  country: string;
  newsletter: boolean;
}

const contactDefaults: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  message: "",
  country: "",
  newsletter: false,
};

// ─── Demo: Sign-up form ───────────────────────────────────────────────────────

interface SignUpForm {
  username: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const signUpDefaults: SignUpForm = {
  username: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

// ─── Demo: Grid + custom field form ──────────────────────────────────────────

interface ProfileForm {
  firstName: string;
  lastName: string;
  bio: string;
  rating: number;
  country: string;
}

const profileDefaults: ProfileForm = {
  firstName: "",
  lastName: "",
  bio: "",
  rating: 3,
  country: "",
};

// ─── Page component ───────────────────────────────────────────────────────────

export const FormBuilderPage: React.FC = () => {
  const [contactResult, setContactResult] = useState<ContactForm | null>(null);
  const [signUpResult, setSignUpResult] = useState<SignUpForm | null>(null);
  const [profileResult, setProfileResult] = useState<ProfileForm | null>(null);

  return (
    <Page>
      <Section variant="hero">
        <Text as="h1" size="3xl" weight="bold">
          Form Builder
        </Text>
        <Text color="secondary">
          Declarative, type-safe form generation powered by TanStack Form.
          Field names are constrained by value type — text/select/textarea
          accept only <code>string</code> keys, number fields only{" "}
          <code>number</code> keys, and checkbox fields only{" "}
          <code>boolean</code> keys. Use <code>fieldType: "custom"</code> to
          render any control, and the <code>columns</code> prop for a
          responsive grid layout.
        </Text>
      </Section>

      {/* ── Contact form ───────────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Contact Form
        </Text>
        <Text color="secondary" size="sm">
          All five field types in one form — text, email, number, textarea,
          select, and checkbox — each bound to a correctly typed field in{" "}
          <code>ContactForm</code>.
        </Text>

        <div className="component-page__demo-column">
          <FormBuilder<ContactForm>
            defaultValues={contactDefaults}
            fields={[
              {
                name: "firstName",
                fieldType: "text",
                label: "First name",
                placeholder: "Jane",
                required: true,
                validate: {
                  onChange: (v) =>
                    v.trim().length === 0 ? "First name is required" : undefined,
                },
              },
              {
                name: "lastName",
                fieldType: "text",
                label: "Last name",
                placeholder: "Doe",
                required: true,
                validate: {
                  onChange: (v) =>
                    v.trim().length === 0 ? "Last name is required" : undefined,
                },
              },
              {
                name: "email",
                fieldType: "email",
                label: "Email address",
                placeholder: "jane@example.com",
                required: true,
                validate: {
                  onChange: (v) =>
                    !v.includes("@") ? "Enter a valid email" : undefined,
                },
              },
              {
                name: "age",
                fieldType: "number",
                label: "Age",
                min: 0,
                max: 120,
                validate: {
                  onBlur: (v) =>
                    v < 0 || v > 120
                      ? "Age must be between 0 and 120"
                      : undefined,
                },
              },
              {
                name: "country",
                fieldType: "select",
                label: "Country",
                placeholder: "Select a country…",
                options: [
                  { label: "Germany", value: "de" },
                  { label: "United States", value: "us" },
                  { label: "United Kingdom", value: "uk" },
                  { label: "France", value: "fr" },
                ],
              },
              {
                name: "message",
                fieldType: "textarea",
                label: "Message",
                placeholder: "Tell us how we can help…",
                rows: 4,
                validate: {
                  onBlur: (v) =>
                    v.trim().length > 0 && v.trim().length < 20
                      ? "Message must be at least 20 characters"
                      : undefined,
                },
              },
              {
                name: "newsletter",
                fieldType: "checkbox",
                label: "Preferences",
                inlineLabel: "Send me occasional news and updates",
              },
            ]}
            onSubmit={(values) => setContactResult(values)}
            submitLabel="Send message"
            resetLabel="Clear"
            onReset={() => setContactResult(null)}
          />

          {contactResult && (
            <pre
              style={{
                background: "var(--color-muted)",
                padding: "var(--spacing-4)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--font-size-sm)",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(contactResult, null, 2)}
            </pre>
          )}
        </div>
      </Section>

      {/* ── Sign-up form ───────────────────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Sign-up Form
        </Text>
        <Text color="secondary" size="sm">
          Cross-field validation via the <code>onBlur</code> validator — confirm
          password must match password. Boolean keys are only accepted by
          checkbox fields.
        </Text>

        <div className="component-page__demo-column">
          <FormBuilder<SignUpForm>
            defaultValues={signUpDefaults}
            fields={[
              {
                name: "username",
                fieldType: "text",
                label: "Username",
                placeholder: "jane_doe",
                required: true,
                validate: {
                  onChange: (v) =>
                    v.length > 0 && v.length < 3
                      ? "Username must be at least 3 characters"
                      : undefined,
                },
              },
              {
                name: "password",
                fieldType: "password",
                label: "Password",
                required: true,
                validate: {
                  onChange: (v) =>
                    v.length > 0 && v.length < 8
                      ? "Password must be at least 8 characters"
                      : undefined,
                },
              },
              {
                name: "confirmPassword",
                fieldType: "password",
                label: "Confirm password",
                required: true,
              },
              {
                name: "agreeTerms",
                fieldType: "checkbox",
                label: "Terms",
                inlineLabel: "I agree to the terms and conditions",
                validate: {
                  onChange: (v) =>
                    !v ? "You must accept the terms" : undefined,
                },
              },
            ]}
            onSubmit={(values) => setSignUpResult(values)}
            submitLabel="Create account"
            resetLabel="Reset"
            onReset={() => setSignUpResult(null)}
          />

          {signUpResult && (
            <pre
              style={{
                background: "var(--color-muted)",
                padding: "var(--spacing-4)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--font-size-sm)",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(signUpResult, null, 2)}
            </pre>
          )}
        </div>
      </Section>

      {/* ── Grid layout + custom field ─────────────────────────── */}
      <Section>
        <Text as="h2" size="2xl" weight="semibold">
          Grid Layout &amp; Custom Field
        </Text>
        <Text color="secondary" size="sm">
          Use <code>columns</code> to arrange fields in a multi-column grid.
          Each field can declare <code>colSpan</code> to occupy more columns.
          The <code>fieldType: "custom"</code> variant lets you embed any
          control — here a star-rating picker built with plain buttons.
        </Text>

        <div className="component-page__demo-column">
          <FormBuilder<ProfileForm>
            defaultValues={profileDefaults}
            columns={2}
            fields={[
              {
                name: "firstName",
                fieldType: "text",
                label: "First name",
                placeholder: "Jane",
                required: true,
              },
              {
                name: "lastName",
                fieldType: "text",
                label: "Last name",
                placeholder: "Doe",
                required: true,
              },
              {
                name: "country",
                fieldType: "select",
                label: "Country",
                placeholder: "Select a country…",
                options: [
                  { label: "Germany", value: "de" },
                  { label: "United States", value: "us" },
                  { label: "United Kingdom", value: "uk" },
                ],
              },
              {
                name: "rating",
                fieldType: "custom",
                label: "Rating",
                colSpan: 1,
                render: ({ label, value, onChange, hasError, errorMessage }) => (
                  <FormControl
                    label={label}
                    error={hasError}
                    errorMessage={errorMessage}
                  >
                    <div
                      role="group"
                      aria-label="Star rating"
                      style={{ display: "flex", gap: "var(--spacing-1)" }}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          aria-label={`${star} star${star > 1 ? "s" : ""}`}
                          aria-pressed={(value as number) >= star}
                          onClick={() => onChange(star)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            padding: "0",
                            color:
                              (value as number) >= star
                                ? "var(--color-warning, #f59e0b)"
                                : "var(--color-border)",
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </FormControl>
                ),
                validate: {
                  onChange: (v) =>
                    (v as number) < 1 ? "Please select a rating" : undefined,
                },
              },
              {
                name: "bio",
                fieldType: "textarea",
                label: "Bio",
                placeholder: "Tell us about yourself…",
                rows: 3,
                colSpan: 2,
              },
            ]}
            onSubmit={(values) => setProfileResult(values)}
            submitLabel="Save profile"
            resetLabel="Reset"
            onReset={() => setProfileResult(null)}
          />

          {profileResult && (
            <pre
              style={{
                background: "var(--color-muted)",
                padding: "var(--spacing-4)",
                borderRadius: "var(--radius-md)",
                fontSize: "var(--font-size-sm)",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(profileResult, null, 2)}
            </pre>
          )}
        </div>
      </Section>
    </Page>
  );
};
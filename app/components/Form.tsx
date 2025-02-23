// This is required to designate to use useActionState
"use client";

import { useActionState } from "react";

interface FormData {
  get(name: string): FormDataEntryValue | null;
}

const NewsletterSubscribe = () => {
  // This simulates an api call to validate the form data
  const validateData = async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const [result, submitAction, isPending] = useActionState(
    async (previousState: any, formData: FormData) => {
      const email = formData.get("email");
      const name = formData.get("name");

      if (!name || !email) {
        return {
          type: "error",
          message: `Please fill in your name and email.`,
        };
      }

      await validateData();

      return {
        type: "success",
        message: `You have succesfully subscribed!`,
      };
    },
    null
  );

  return (
    <>
      {result && <p className={`message ${result.type}`}>{result.message}</p>}
      {isPending && <p className="message loading">Loading ...</p>}
      <form action={submitAction}>
        <h3>Join the newsletter</h3>
        <div className="pb-2">
          <label htmlFor="name" className="pr-4">
            Name
          </label>
          <input type="text" id="name" name="name" className="text-black" />
        </div>
        <div className="pb-2">
          <label htmlFor="email" className="pr-4">
            Email
          </label>
          <input type="email" id="email" name="email" className="text-black" />
        </div>
        <div>
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </>
  );
};

export default NewsletterSubscribe;

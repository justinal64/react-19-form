"use client";
import { useActionState } from "react";

const fakeSendEmail = async () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const NewsletterSubscribe = () => {
  const [result, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const email = formData.get("email");
      const name = formData.get("name");

      if (!name || !email) {
        return {
          type: "error",
          message: `Please fill in your name and email.`,
        };
      }

      await fakeSendEmail();

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
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <button type="submit">Subscribe</button>
        </div>
      </form>
    </>
  );
};

export default NewsletterSubscribe;

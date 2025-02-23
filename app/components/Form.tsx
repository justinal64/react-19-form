// This is required to designate to use useActionState
"use client";

import { useActionState } from "react";

interface FormData {
  get(name: string): FormDataEntryValue | null;
}

interface ActionState {
  type: "success" | "error";
  message: string;
}

const NewsletterSubscribe = () => {
  // This simulates an api call to validate the form data
  const fakeApicall = async () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  // Standalone action function
  const handleNewsletterSubscription = async (
    previousState: any,
    formData: FormData
  ): Promise<ActionState> => {
    const email = formData.get("email");
    const name = formData.get("name");

    // Basic validation (use Yup here)
    if (!name || !email) {
      return {
        type: "error",
        message: "Please fill in your name and email.",
      };
    }

    // Simulate an api call
    await fakeApicall();

    // actionState requires the response to be an object with a type and message
    return {
      type: "success",
      message: "You have successfully subscribed!",
    };
  };

  const [result, submitAction, isPending] = useActionState(
    handleNewsletterSubscription,
    null
    // Example of what the initial state (value assigned to previousState) could look like
    // {
    //   type: "start",
    //   message: "I don't have any data yet....",
    // }
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
          <button
            type="submit"
            disabled={isPending}
            className={`w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewsletterSubscribe;

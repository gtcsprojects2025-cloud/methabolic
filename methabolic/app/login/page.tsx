"use client";
import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
// Define the available view states for the portal
type ActiveTab = 'login' | 'signup' | 'forgot' | 'mfa';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('login');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [enableSignup, setEnableSignup] = useState<boolean>(false); // Toggle to enable/disable sign-up flow
  
  // Custom states for interactivity
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [mfaCode, setMfaCode] = useState<string[]>(['', '', '', '', '', '']);
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; text: string; color: string }>({ score: 0, text: 'Weak', color: 'bg-red-500' });

  // Handle password strength calculation on password change
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, text: 'None', color: 'bg-gray-300' });
      return;
    }
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let text = 'Weak';
    let color = 'bg-red-500';
    if (score === 2) {
      text = 'Fair';
      color = 'bg-orange-400';
    } else if (score === 3) {
      text = 'Good';
      color = 'bg-yellow-400';
    } else if (score === 4) {
      text = 'Strong';
      color = 'bg-emerald-500';
    }

    setPasswordStrength({ score, text, color });
  }, [password]);

  // Clean notifications after a delay
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Simulated handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setNotification({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    
    setIsLoading(true);

    if (email === 'admin@methabolic.com' && password === 'admin123') {
    //   setActiveTab('mfa');
    localStorage.setItem('isLoggedIn', 'true');
    redirect('/admin');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setNotification({ type: 'error', message: 'All fields are required.' });
      return;
    }
    if (password !== confirmPassword) {
      setNotification({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    if (!agreeToTerms) {
      setNotification({ type: 'error', message: 'You must agree to the terms and conditions.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ type: 'success', message: 'Registration successful! You can now log in.' });
      setActiveTab('login');
      setPassword('');
      setConfirmPassword('');
    }, 1800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setNotification({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ type: 'success', message: 'Password recovery email sent successfully!' });
      setActiveTab('login');
    }, 1500);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = mfaCode.join('');
    if (code.length < 6) {
      setNotification({ type: 'error', message: 'Please enter the complete 6-digit code.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ type: 'success', message: 'Successfully authenticated! Welcome back.' });
      // Reset flow
      setActiveTab('login');
      setEmail('');
      setPassword('');
      setMfaCode(['', '', '', '', '', '']);
    }, 1500);
  };

  const handleMfaCodeChange = (index: number, val: string) => {
    if (isNaN(Number(val))) return;
    const newMfaCode = [...mfaCode];
    newMfaCode[index] = val.slice(-1); // only keep last character
    setMfaCode(newMfaCode);

    // Auto-focus next field
    if (val && index < 5) {
      const nextInput = document.getElementById(`mfa-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleMfaKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
      const prevInput = document.getElementById(`mfa-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setNotification({ type: 'success', message: `Connecting securely with ${provider}...` });
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ type: 'success', message: `Authenticated via ${provider}!` });
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 p-4 mt-24 relative overflow-hidden ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Premium Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 blur-3xl pointer-events-none" />

      {/* Theme Toggle & Decorative Brand Element */}
      <div className="absolute top-6 left-6 right-6 py-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-200 to-violet-200 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            {/* <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg> */}
            <Image src="/logo.png" alt="Logo" width={20} height={20} className="w-5 h-5" />
          </div>
          {/* <span className={`font-bold text-lg tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            MetabolomicsAfrica<span className="text-indigo-500">.</span>
          </span> */}
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Theme"
          className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 ${
            isDarkMode 
              ? 'bg-slate-900/80 border-slate-800 text-yellow-400 hover:bg-slate-800' 
              : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100'
          } backdrop-blur-md shadow-sm`}
        >
          {isDarkMode ? (
            // Sun Icon
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            // Moon Icon
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-lg z-10 transition-all duration-300">
        
        {/* Custom Toast Notifications */}
        {notification && (
          <div className={`mb-4 p-4 rounded-xl border flex items-start space-x-3 shadow-lg animate-slide-in transition-all duration-300 ${
            notification.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          } backdrop-blur-md`}>
            <div className="flex-shrink-0 mt-0.5">
              {notification.type === 'success' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex-1 text-sm font-medium">{notification.message}</div>
          </div>
        )}

        {/* Portal Card Wrapper */}
        <div className={`border rounded-3xl p-8 transition-all duration-300 relative ${
          isDarkMode 
            ? 'bg-slate-900/60 border-slate-800/80 shadow-2xl shadow-indigo-950/20' 
            : 'bg-white/80 border-slate-200 shadow-2xl shadow-slate-200/50'
        } backdrop-blur-xl`}>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeTab === 'login' && 'Welcome Back'}
              {activeTab === 'signup' && 'Create Account'}
              {activeTab === 'forgot' && 'Reset Password'}
              {activeTab === 'mfa' && 'Verify Identity'}
            </h1>
            <p className={`text-sm mt-2 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {activeTab === 'login' && 'ADMIN LOGIN'}
              {activeTab === 'signup' && 'Sign up is currently disabled.'}
              {activeTab === 'forgot' && "Enter your email and we'll send you recovery details."}
              {activeTab === 'mfa' && 'We sent a verification code to your auth app.'}
            </p>
          </div>

          {/* Tab Selector (only for Login & Sign up) */}
          {(activeTab === 'login' || activeTab === 'signup') && (
            <div className={`grid grid-cols-2 p-1.5 rounded-2xl mb-8 ${isDarkMode ? 'bg-slate-950/60' : 'bg-slate-100/80'}`}>
              <button
                onClick={() => { setActiveTab('login'); setNotification(null); }}
                className={`py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'login'
                    ? (isDarkMode ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-900 shadow')
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('signup'); setNotification(null); }}
                className={`py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === 'signup'
                    ? (isDarkMode ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-900 shadow')
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900')
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Form Processing Loader Overlay */}
          {/* {isLoading && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-3xl bg-inherit/90 backdrop-blur-sm">
              <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-4" />
              <p className="text-sm font-semibold tracking-wide animate-pulse text-indigo-500">Processing secure transaction...</p>
            </div>
          )} */}

          {/* FORMS */}

          {/* 1. Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3.5 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/50 bg-transparent transition"
                  />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Remember device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.99] transition-all duration-150"
              >
                Sign In securely
              </button>
            </form>
          )}

          {/* 2. Sign Up Form */}
          {activeTab === 'signup' && enableSignup && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-12 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span>Password Strength</span>
                      <span className={passwordStrength.color.replace('bg-', 'text-')}>{passwordStrength.text}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-0.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div 
                          key={step} 
                          className={`h-full flex-1 transition-colors duration-300 ${
                            step <= passwordStrength.score ? passwordStrength.color : 'bg-slate-800'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Confirm Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="py-1">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-5 w-5 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/50 bg-transparent transition"
                  />
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    I agree to the <span className="text-indigo-500">Terms of Service</span> and <span className="text-indigo-500">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.99] transition-all duration-150"
              >
                Register Account
              </button>
            </form>
          )}

          {/* 3. Forgot Password Form */}
          {activeTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                      isDarkMode 
                        ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-indigo-500 focus:bg-slate-950' 
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.99] transition-all duration-150"
                >
                  Send Recovery Link
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setNotification(null); }}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 border ${
                    isDarkMode 
                      ? 'bg-slate-950/20 border-slate-800 text-slate-300 hover:bg-slate-950 hover:text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* 4. Multi-Factor Auth (MFA) Form */}
          {activeTab === 'mfa' && (
            <form onSubmit={handleMfaSubmit} className="space-y-6">
              <div className="flex justify-between gap-2 py-2">
                {mfaCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`mfa-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleMfaCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleMfaKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-xl font-bold rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-slate-950/40 border-slate-800 text-white focus:border-indigo-500'
                        : 'bg-slate-50/50 border-slate-200 text-slate-900 focus:border-indigo-500'
                    }`}
                  />
                ))}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:brightness-110 active:scale-[0.99] transition-all duration-150"
                >
                  Verify and Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setNotification(null); }}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 border ${
                    isDarkMode 
                      ? 'bg-slate-950/20 border-slate-800 text-slate-300 hover:bg-slate-950 hover:text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

{/* social login buttons */}
        </div>

        {/* Footer info/legal links */}

      </div>
    </div>
  );
}
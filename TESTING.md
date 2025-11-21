# QA Testing Checklist

Perform these manual tests to ensure the application functionality meets requirements.

### 1. First-Time Load Experience
- [ ] Open the app in an Incognito window.
- [ ] Verify the "Award Winning" SVG Loader appears for approx 3 seconds.
- [ ] Verify it cross-fades smoothly into the Hero section.
- [ ] Refresh the page. Verify the loader **does NOT** appear again.

### 2. Hero Section
- [ ] Check that 3 finalist cards appear with staggered animation.
- [ ] Hover over cards: verify 3D tilt effect and shadow glow.
- [ ] Verify the background (Spline or Gradient) is visible.
- [ ] Resize window: ensure cards stack vertically on mobile.

### 3. Reveal Flow (The Core Logic)
- [ ] Click "Reveal Winners". Modal should open and lock background scrolling.
- [ ] Click "Reveal Winner" (or "Ready").
- [ ] **Timing Check**: Digits should appear one by one (approx 350ms each).
- [ ] **Suspense**: Observe the "_" placeholder pulsing before the number appears.
- [ ] **Pause**: After the 4th digit, verify a short pause (~800ms) before the card changes state.
- [ ] **Celebration**: Verify confetti bursts and the card gets a "Verified" checkmark.
- [ ] Click "Next Reveal". Repeat for Winner 2 and Winner 3.
- [ ] Verify you cannot close the modal via the "X" button during the active revealing phase (to prevent breaking flow).

### 4. Final Summary
- [ ] After the 3rd winner, verify the "Congratulations" summary screen appears.
- [ ] Check that all 3 winners are listed with their codes revealed.
- [ ] Click "Return to Home". Modal closes, scroll unlocks.

### 5. Admin / Data
- [ ] Click the gear icon (bottom right).
- [ ] Create a `test.json` with different names. Upload it.
- [ ] Verify the UI updates immediately with new names.

### 6. Accessibility
- [ ] Use Tab key to navigate through the Hero section. Focus should land on "Reveal Winners".
- [ ] While revealing, use a screen reader (VoiceOver/NVDA) if possible to check if `aria-live` region announces updates.

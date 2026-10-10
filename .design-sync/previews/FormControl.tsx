import React from 'react';
import { FormControl } from '@mp-ku/mp-components';

export const Default = () => (
  <FormControl label="Email address" htmlFor="fc-email" helperText="We'll never share your email">
    <input className="mp-input mp-input--md" id="fc-email" type="email" placeholder="jane.doe@example.com" />
  </FormControl>
);

export const Required = () => (
  <FormControl label="Project name" htmlFor="fc-project" required>
    <input className="mp-input mp-input--md" id="fc-project" type="text" defaultValue="Website relaunch" />
  </FormControl>
);

export const WithError = () => (
  <FormControl
    label="Phone number"
    htmlFor="fc-phone"
    error
    errorMessage="Please enter a valid phone number"
  >
    <input className="mp-input mp-input--md" id="fc-phone" type="tel" defaultValue="+49 30 12" />
  </FormControl>
);

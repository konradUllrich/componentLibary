import React from 'react';
import { DateComponent, Text } from '../../common';

export const DatePage: React.FC = () => {
  const sampleDate = new Date('2024-03-15T14:30:00');

  return (
    <div className="component-page">
      <div className="component-page__header">
        <Text as="h1" size="3xl" weight="bold">Date Component</Text>
        <Text color="secondary">
          Display formatted dates with multiple format options and locales
        </Text>
      </div>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Format Options</Text>
        <Text color="secondary" size="sm">
          Different date formatting options
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Short format (default):</Text>
            <Text><DateComponent date={sampleDate} format="short" /></Text>
          </div>
          <div>
            <Text weight="medium" size="sm">Long format:</Text>
            <Text><DateComponent date={sampleDate} format="long" /></Text>
          </div>
          <div>
            <Text weight="medium" size="sm">DateTime format:</Text>
            <Text><DateComponent date={sampleDate} format="datetime" /></Text>
          </div>
          <div>
            <Text weight="medium" size="sm">Time only:</Text>
            <Text><DateComponent date={sampleDate} format="time" /></Text>
          </div>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Locales</Text>
        <Text color="secondary" size="sm">
          Support for different locale formats (default: de-DE)
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">German (de-DE):</Text>
            <Text><DateComponent date={sampleDate} format="long" locale="de-DE" /></Text>
          </div>
          <div>
            <Text weight="medium" size="sm">US English (en-US):</Text>
            <Text><DateComponent date={sampleDate} format="long" locale="en-US" /></Text>
          </div>
          <div>
            <Text weight="medium" size="sm">British English (en-GB):</Text>
            <Text><DateComponent date={sampleDate} format="long" locale="en-GB" /></Text>
          </div>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Null/Undefined Handling</Text>
        <Text color="secondary" size="sm">
          Graceful handling of missing dates with fallback
        </Text>
        <div className="component-page__demo">
          <div>
            <Text weight="medium" size="sm">Null date (default fallback):</Text>
            <Text><DateComponent date={null} /></Text>
          </div>
          <div>
            <Text weight="medium" size="sm">Null date (custom fallback):</Text>
            <Text><DateComponent date={null} fallback="No date available" /></Text>
          </div>
        </div>
      </section>

      <section className="component-page__section">
        <Text as="h2" size="2xl" weight="semibold">Usage</Text>
        <pre className="code-block">
          <code>{`import { DateComponent } from '@konradullrich/mp-components';

// Basic usage (short format, German locale)
<DateComponent date={new Date()} />

// Long format with US locale
<DateComponent 
  date={new Date()} 
  format="long" 
  locale="en-US" 
/>

// DateTime format
<DateComponent 
  date={new Date()} 
  format="datetime" 
/>

// With custom fallback for null dates
<DateComponent 
  date={null} 
  fallback="No date available" 
/>`}</code>
        </pre>
      </section>
    </div>
  );
};

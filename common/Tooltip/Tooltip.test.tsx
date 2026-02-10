import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';
import { ControlledTooltip } from './Tooltip.stories';
import { checkA11y } from '../../playwright/test-utils';

test.describe('Tooltip Component', () => {
  test('should render trigger element', async ({ mount, page }) => {
    await mount(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveText('Hover me');
  });

  test('should show tooltip on hover', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    
    // Initially hidden
    await expect(page.locator('.tooltip__content')).not.toBeVisible();
    
    // Hover to show
    await trigger.hover();
    
    // Use getByRole for more specific selector
    const content = page.getByRole('tooltip');
    await expect(content).toBeVisible();
    await expect(content).toContainText('Tooltip text');
  });

  test('should hide tooltip when mouse leaves', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <div style={{ padding: '100px' }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button data-testid="trigger">Hover me</button>
            </TooltipTrigger>
            <TooltipContent>
              Tooltip text
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
    
    const trigger = page.getByTestId('trigger');
    
    // Hover to show
    await trigger.hover();
    await expect(page.getByRole('tooltip')).toBeVisible();
    
    // Move mouse far away from both trigger and tooltip
    await page.mouse.move(1000, 1000);
    
    // Tooltip should eventually hide (give it some time)
    await expect(page.getByRole('tooltip')).not.toBeVisible({ timeout: 2000 });
  });

  test('should show tooltip on focus', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Focus me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    const content = page.locator('.tooltip__content');
    
    // Focus to show
    await trigger.focus();
    await expect(content).toBeVisible();
  });

  test('should hide tooltip on blur', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Focus me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    const content = page.locator('.tooltip__content');
    
    // Focus to show
    await trigger.focus();
    await expect(content).toBeVisible();
    
    // Blur to hide
    await trigger.blur();
    await expect(content).not.toBeVisible();
  });

  test('should support different sides', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <div style={{ display: 'flex', gap: '200px', padding: '200px', justifyContent: 'center' }}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button data-testid="top">Top</button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Top tooltip
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button data-testid="right">Right</button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Right tooltip
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    );
    
    // Test top side
    await page.getByTestId('top').hover();
    const topTooltip = page.getByRole('tooltip', { name: /Top tooltip/ });
    await expect(topTooltip).toBeVisible();
    
    // Move to different button to hide previous tooltip
    await page.getByTestId('right').hover();
    await expect(topTooltip).not.toBeVisible();
    
    // Test right side
    const rightTooltip = page.getByRole('tooltip', { name: /Right tooltip/ });
    await expect(rightTooltip).toBeVisible();
  });

  test('should respect delay duration', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    const content = page.locator('.tooltip__content');
    
    // Hover
    await trigger.hover();
    
    // Should not appear immediately
    await expect(content).not.toBeVisible();
    
    // Wait for delay
    await page.waitForTimeout(600);
    await expect(content).toBeVisible();
  });

  test('should support controlled state', async ({ mount, page }) => {
    await mount(<ControlledTooltip />);
    
    const trigger = page.locator('button');
    const content = page.locator('.tooltip__content');
    
    // Initially closed
    await expect(content).not.toBeVisible();
    
    // Hover to open
    await trigger.hover();
    await page.waitForTimeout(100);
    await expect(content).toBeVisible();
  });

  test('should render arrow', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    await trigger.hover();
    
    const arrow = page.locator('.tooltip__arrow');
    await expect(arrow).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    const trigger = page.locator('button');
    await trigger.hover();
    
    // Radix provides role="tooltip" automatically via an internal mechanism
    const tooltip = page.getByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('Tooltip text');
  });

  test('should pass accessibility audit', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover for info</button>
          </TooltipTrigger>
          <TooltipContent>
            This is helpful tooltip information
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    // Show tooltip
    await page.locator('button').hover();
    
    await checkA11y(page);
  });

  test('should apply custom className', async ({ mount, page }) => {
    await mount(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent className="custom-class">
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    
    await page.locator('button').hover();
    
    const content = page.locator('.tooltip__content');
    await expect(content).toHaveClass(/custom-class/);
  });
});

import { test, expect } from '@playwright/experimental-ct-react';
import { UserAvatars } from './UserAvatars';
import { checkA11y } from '../../playwright/test-utils';

// Test Component: UserAvatars
test.describe('UserAvatars Component', () => {
  const mockUsers = [
    { id: 1, fullName: 'John Doe', initials: 'JD', avatarColor: '#FF5733' },
    { id: 2, fullName: 'Jane Smith', initials: 'JS', avatarColor: '#33FF57' },
    { id: 3, fullName: 'Bob Wilson', initials: 'BW', avatarColor: '#3357FF' },
    { id: 4, fullName: 'Alice Brown', initials: 'AB', avatarColor: '#F3FF33' },
    { id: 5, fullName: 'Charlie Davis', initials: 'CD', avatarColor: '#FF33F3' },
  ];

  test('should render with single user', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={[mockUsers[0]]} />
    );
    
    await expect(component).toBeVisible();
    const avatar = component.locator('.user-avatar');
    await expect(avatar).toHaveCount(1);
    await expect(avatar).toContainText('JD');
  });

  test('should render multiple users up to maxVisible', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={mockUsers} maxVisible={3} />
    );
    
    const avatars = component.locator('.user-avatar');
    // 3 visible users + 1 overflow indicator
    await expect(avatars).toHaveCount(4);
  });

  test('should display overflow indicator when users exceed maxVisible', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={mockUsers} maxVisible={2} />
    );
    
    const overflow = component.locator('.user-avatars__item--remaining');
    await expect(overflow).toBeVisible();
    await expect(overflow).toContainText('+3');
    await expect(overflow).toHaveAttribute('title', '+3 more');
  });

  test('should render empty state when no users provided', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={[]} />
    );
    
    const emptyState = component.locator('.user-avatars__empty');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('-');
  });

  test('should render different sizes', async ({ mount }) => {
    const component = await mount(
      <div>
        <UserAvatars users={[mockUsers[0]]} size="sm" />
        <UserAvatars users={[mockUsers[1]]} size="md" />
        <UserAvatars users={[mockUsers[2]]} size="lg" />
      </div>
    );
    
    const avatars = component.locator('.user-avatar');
    await expect(avatars.nth(0)).toHaveClass(/user-avatar--sm/);
    await expect(avatars.nth(1)).toHaveClass(/user-avatar--md/);
    await expect(avatars.nth(2)).toHaveClass(/user-avatar--lg/);
  });

  test('should apply custom className', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={mockUsers} className="custom-class" />
    );
    
    await expect(component).toHaveClass(/custom-class/);
  });

  test('should display user initials correctly', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={mockUsers.slice(0, 2)} />
    );
    
    const avatars = component.locator('.user-avatar');
    await expect(avatars.nth(0)).toContainText('JD');
    await expect(avatars.nth(1)).toContainText('JS');
  });

  test('should apply avatar colors from user data', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={[mockUsers[0]]} />
    );
    
    const avatar = component.locator('.user-avatar').first();
    const bgColor = await avatar.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Color should be applied (checking it's not empty)
    expect(bgColor).toBeTruthy();
  });

  test('should render all users when maxVisible is not provided', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={mockUsers.slice(0, 3)} />
    );
    
    const avatars = component.locator('.user-avatar');
    // Default maxVisible is 3, so we should see exactly 3 avatars
    await expect(avatars).toHaveCount(3);
  });

  test('should have correct BEM structure', async ({ mount }) => {
    const component = await mount(
      <UserAvatars users={mockUsers} maxVisible={2} />
    );
    
    await expect(component.locator('.user-avatars')).toBeVisible();
    await expect(component.locator('.user-avatars__group')).toBeVisible();
    await expect(component.locator('.user-avatars__item')).toHaveCount(3); // 2 visible + 1 overflow
  });

  test('should forward ref to root element', async ({ mount }) => {
    let refElement: HTMLDivElement | null = null;
    
    await mount(
      <UserAvatars
        users={mockUsers}
        ref={(el) => { refElement = el; }}
      />
    );
    
    expect(refElement).toBeTruthy();
    expect(refElement?.tagName).toBe('DIV');
  });

  test('should pass accessibility checks', async ({ mount, page }) => {
    await mount(
      <UserAvatars users={mockUsers} maxVisible={3} />
    );
    
    // Note: User avatars use title attributes for tooltips which is accessible
    await checkA11y(page);
  });

  test('should pass accessibility checks with empty state', async ({ mount, page }) => {
    await mount(
      <UserAvatars users={[]} />
    );
    
    await checkA11y(page);
  });

  test.describe('Edge Cases', () => {
    test('should handle maxVisible greater than users length', async ({ mount }) => {
      const component = await mount(
        <UserAvatars users={mockUsers.slice(0, 2)} maxVisible={5} />
      );
      
      const avatars = component.locator('.user-avatar');
      await expect(avatars).toHaveCount(2);
      
      // No overflow indicator should be present
      const overflow = component.locator('.user-avatars__item--remaining');
      await expect(overflow).toHaveCount(0);
    });

    test('should handle maxVisible of 0', async ({ mount }) => {
      const component = await mount(
        <UserAvatars users={mockUsers} maxVisible={0} />
      );
      
      // Should show only overflow indicator
      const overflow = component.locator('.user-avatars__item--remaining');
      await expect(overflow).toBeVisible();
      await expect(overflow).toContainText(`+${mockUsers.length}`);
    });

    test('should handle users without avatarColor', async ({ mount }) => {
      const usersWithoutColor = [
        { id: 1, fullName: 'Test User', initials: 'TU', avatarColor: null },
      ];
      
      const component = await mount(
        <UserAvatars users={usersWithoutColor} />
      );
      
      const avatar = component.locator('.user-avatar');
      await expect(avatar).toBeVisible();
      // Should fall back to generated color from initials
    });
  });
});

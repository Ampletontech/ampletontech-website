# Blogs Page - Verification Checklist

## Files Created/Updated
- ✅ `blogs.html` - Complete HTML structure
- ✅ `css/blogs.css` - Pixel-accurate CSS styling
- 📝 `assets/BLOG_IMAGES_NEEDED.md` - List of required blog images

## Visual Verification Checklist

### 1. Desktop View (Design Width ~1400px)
Check the following alignment points at 100% zoom:

- [ ] **Header**: Dark purple background (#7628a3), white text, logo "Ampleton" on left
- [ ] **Navigation**: All menu items (Home, About Us, Services, Projects, Blogs, Careers) centered, white text
- [ ] **Contact Us Button**: Purple button (#8B5CF6) on right side of header
- [ ] **Hero Section**: Gradient purple background (from #7628a3 to #8B5CF6)
- [ ] **Hero Title**: "Powering a Smarter, Stronger Future Together" - large white text, centered
- [ ] **Hero Description**: White text, centered, below title
- [ ] **Hero CTA Button**: White button with purple border, centered below description
- [ ] **Blog Section Title**: "Blog" - large black text (48px), left-aligned
- [ ] **See All Button**: Black border button, right-aligned next to title
- [ ] **Blog Grid**: 4 rows × 2 columns (8 cards total)
- [ ] **Blog Cards**: Each card has image (240px height), title, description, author name, read time
- [ ] **Footer Newsletter**: Purple banner with white text, email input, Contact Us button
- [ ] **Footer Content**: Dark gray background, company name, tagline, navigation links, address, phone
- [ ] **Footer Bottom**: Copyright text, Privacy Policy, Terms of Service, social media icons

### 2. Font Rendering Check
- [ ] **Font Family**: System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Oxygen, Ubuntu, Cantarell, sans-serif)
- [ ] **Note**: Exact Figma font file not provided - using closest system font match. For pixel-perfect match, provide the exact font file (likely Inter or similar) and update `@font-face` in CSS.

### 3. Hover States Check
- [ ] **Header CTA Button**: Darkens on hover, slight lift effect
- [ ] **Hero CTA Button**: Slight lift, shadow appears
- [ ] **Blog Cards**: Lift up 4px, shadow increases
- [ ] **Blog Card Images**: Slight zoom effect (scale 1.05)
- [ ] **See All Button**: Background fills black, text turns white
- [ ] **Footer Links**: Change to purple (#B886DB) on hover
- [ ] **Social Icons**: Change to white on hover
- [ ] **Newsletter Button**: Slight lift, shadow appears

### 4. Mobile/Tablet Viewport Checks

#### Tablet (~768px)
- [ ] Blog grid changes to 1 column
- [ ] Header navigation may need hamburger menu (currently hidden)
- [ ] Footer newsletter form stacks vertically
- [ ] Footer content stacks vertically
- [ ] Footer bottom content stacks vertically

#### Mobile (~375px)
- [ ] Hero title reduces to 28px
- [ ] Blog section title reduces to 28px
- [ ] Blog cards maintain proper spacing
- [ ] All text remains readable
- [ ] Buttons remain tappable (min 44px touch target)

### 5. Image Optimization Check
- [ ] All 8 blog images are present in `assets/images/` folder
- [ ] Images are optimized (JPEG, < 200KB each recommended)
- [ ] Images maintain 5:3 aspect ratio (or 800x480px recommended)
- [ ] Alt text is present for all images (accessibility)
- [ ] Images load without layout shift

### 6. Accessibility Checks
- [ ] All images have descriptive `alt` attributes
- [ ] Semantic HTML used (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`)
- [ ] ARIA labels on interactive elements (social icons have `aria-label`)
- [ ] Color contrast: White text on purple (#7628a3) - WCAG AA compliant
- [ ] Color contrast: Black text on white - WCAG AA compliant
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works (Tab through all links/buttons)

## Pixel-Perfect Verification Tool

### Option 1: Browser DevTools
1. Open `blogs.html` in Chrome/Firefox
2. Open DevTools (F12)
3. Use Device Toolbar (Ctrl+Shift+M)
4. Set viewport to 1400px width (desktop design size)
5. Take screenshot
6. Compare with Figma design overlay

### Option 2: Pixelmatch (Node.js)
```bash
npm install -g pixelmatch
# Compare screenshots pixel-by-pixel
```

### Option 3: Visual Regression Testing
- Use tools like Percy, Chromatic, or BackstopJS
- Capture screenshots at different breakpoints
- Compare against Figma design exports

## Known Limitations & Notes

1. **Font Files**: Exact Figma font not provided. Using system font stack. For perfect match:
   - Export font files from Figma (WOFF2 format recommended)
   - Add `@font-face` declarations to CSS
   - Update `font-family` in `:root` variables

2. **Blog Images**: 8 placeholder image references created. Replace with actual images:
   - See `assets/BLOG_IMAGES_NEEDED.md` for specifications
   - Images should match descriptions from Figma design

3. **Hero Background Pattern**: Subtle geometric pattern in hero section approximated with CSS gradients. For exact match:
   - Export pattern as SVG or PNG from Figma
   - Add as `background-image` with appropriate positioning

4. **Newsletter Pattern**: Hexagonal pattern in newsletter banner approximated with CSS. For exact match:
   - Export pattern from Figma
   - Replace CSS pattern with exported image

## Color Values Used (from Design)
- Primary Purple: `#7628a3`
- Primary Purple Dark: `#5d1f82`
- Primary Purple Light: `#8B5CF6`
- Text Dark: `#111827`
- Text Light: `#6B7280`
- Background Dark: `#1F2937`
- White: `#ffffff`

## Spacing & Typography
- Hero Title: 56px, font-weight 700
- Blog Section Title: 48px, font-weight 700
- Blog Card Title: 20px, font-weight 600
- Blog Card Description: 14px, font-weight 400
- Blog Card Meta: 14px, font-weight 500
- Card Gap: 32px
- Section Padding: 80px vertical, 40px horizontal

## Responsive Breakpoints
- Desktop: 1400px (design width)
- Tablet: 768px
- Mobile: 375px

## Testing Commands

### Local Server (Python)
```bash
python -m http.server 8000
# Open http://localhost:8000/blogs.html
```

### Local Server (Node.js)
```bash
npx http-server
# Open http://localhost:8080/blogs.html
```

## Next Steps

1. ✅ HTML structure complete
2. ✅ CSS styling complete
3. ⏳ Add blog images (8 images needed)
4. ⏳ Add exact font files (if available from Figma)
5. ⏳ Export and add hero background pattern (if different from CSS gradient)
6. ⏳ Export and add newsletter pattern (if different from CSS pattern)
7. ⏳ Test on actual devices/browsers
8. ⏳ Verify pixel-perfect match with Figma design


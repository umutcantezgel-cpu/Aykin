# E2E Test Infra: Hey Fede! – Dessertbar & Café Wetzlar

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.
- Target framework: Playwright (suitable for Next.js, UI animations, and Canvas verification).

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | Global Layout (Header, Footer) | ORIGINAL_REQUEST § R1 (Phase 3) | 5      | 5      | ✓      |
| 2 | SyrupCursor | ORIGINAL_REQUEST § R1 (Phase 4) | 5      | 5      | ✓      |
| 3 | LiquidTransition | ORIGINAL_REQUEST § R1 (Phase 4) | 5      | 5      | ✓      |
| 4 | PhysicsPlayground | ORIGINAL_REQUEST § R1 (Phase 4) | 5      | 5      | ✓      |
| 5 | ScratchCard | ORIGINAL_REQUEST § R1 (Phase 4) | 5      | 5      | ✓      |
| 6 | Home Page | ORIGINAL_REQUEST § R1 (Phase 5) | 5      | 5      | ✓      |
| 7 | Menu Page | ORIGINAL_REQUEST § R1 (Phase 5) | 5      | 5      | ✓      |
| 8 | About Page | ORIGINAL_REQUEST § R1 (Phase 5) | 5      | 5      | ✓      |
| 9 | Visit Page | ORIGINAL_REQUEST § R1 (Phase 5) | 5      | 5      | ✓      |
| 10 | Auth (Login/Signup) | ORIGINAL_REQUEST § R1 (Phase 6) | 5      | 5      | ✓      |
| 11 | Cart | ORIGINAL_REQUEST § R1 (Phase 6) | 5      | 5      | ✓      |
| 12 | Support | ORIGINAL_REQUEST § R1 (Phase 6) | 5      | 5      | ✓      |
| 13 | Legal Pages | ORIGINAL_REQUEST § R1 (Phase 6) | 5      | 5      | ✓      |

## Test Architecture
- Test runner: Playwright (`npx playwright test`)
- Test case format: TypeScript Playwright tests (`tests/e2e/*.spec.ts`)
- Expected: all tests pass with exit code 0
- Directory layout: `tests/e2e/` (at project root)

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | Customer Browses Menu and Adds Items | Home, Menu, Global Layout, Cart | High |
| 2 | Guest interacts with Physics Playground then signs up | PhysicsPlayground, Auth, Global Layout | High |
| 3 | User navigates across all core pages with LiquidTransition | Home, Menu, About, Visit, LiquidTransition | Medium |
| 4 | User plays ScratchCard, wins a code, uses it in Cart | ScratchCard, Cart, Auth | High |
| 5 | Unauthenticated User checks Support & Legal then logs in | Support, Legal Pages, Auth | Medium |
| 6 | Full user journey: Landing, interactions, auth, cart checkout | All pages, Master-Features, Auth, Cart | Very High |

## Coverage Thresholds
- Tier 1: ≥5 per feature
- Tier 2: ≥5 per feature (where boundaries exist)
- Tier 3: pairwise coverage of major feature interactions
- Tier 4: ≥5 realistic application scenarios

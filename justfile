default:
    @just --list

test_smoke:
    npx playwright test

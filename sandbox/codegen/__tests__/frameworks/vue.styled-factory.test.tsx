/** @jsxImportSource vue */
import { describe, expect, test } from 'vitest'
import { Box, Stack, styled } from '../../styled-system-vue/jsx'
import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/vue'
import { buttonWithCompoundVariants } from '../../styled-system-vue/recipes'

describe('styled factory - cva', () => {
  const Button = styled('button', {
    base: {
      color: 'red.500',
      bg: 'blue.500',
      _hover: {
        color: 'red.600',
        bg: 'blue.600',
      },
    },
    variants: {
      size: {
        sm: {
          fontSize: 'sm',
          px: 'sm',
          py: 'xs',
        },
        md: {
          fontSize: 'md',
          px: 'md',
          py: 'sm',
        },
        lg: {
          fontSize: 'lg',
          px: 'lg',
          py: 'md',
        },
      },
    },
    compoundVariants: [
      {
        size: 'lg',
        css: { px: '123px', zIndex: 1 },
      },
    ],
  })

  test('base styles', () => {
    const { container } = render(<Button>Click me</Button>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.500 bg_blue.500 hover:c_red.600 hover:bg_blue.600"
      >
        Click me
      </button>
    `)
  })

  test('variant styles', () => {
    const { container } = render(<Button size="sm">Click me</Button>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.500 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_sm px_sm py_xs"
      >
        Click me
      </button>
    `)
  })

  test('compound variants', () => {
    const { container } = render(<Button size="lg">Click me</Button>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.500 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_lg px_123px py_md z_1"
      >
        Click me
      </button>
    `)
  })

  test('custom className', () => {
    const { container } = render(
      <Button class="custom-btn" size="sm">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.500 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_sm px_sm py_xs custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('style prop', () => {
    const { container } = render(
      <Button class="custom-btn" mx="2">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.500 bg_blue.500 hover:c_red.600 hover:bg_blue.600 mx_2 custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('style prop with variant', () => {
    const { container } = render(
      <Button class="custom-btn" size="sm" mx="2">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.500 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_sm px_sm py_xs mx_2 custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('css prop', () => {
    const { container } = render(
      <Button class="custom-btn" css={{ color: 'red.100', fontSize: 'md' }}>
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.100 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_md custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('css prop with variant', () => {
    const { container } = render(
      <Button class="custom-btn" size="sm" css={{ color: 'red.100', fontSize: 'md' }}>
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.100 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_md px_sm py_xs custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('all together', () => {
    const { container } = render(
      <Button class="custom-btn" css={{ color: 'red.200', fontSize: 'xl' }} size="lg" mx="2">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="c_red.200 bg_blue.500 hover:c_red.600 hover:bg_blue.600 fs_xl px_123px py_md z_1 mx_2 custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('nested composition', () => {
    const StyledButton = styled('button', {
      base: {
        fontWeight: 'semibold',
        h: '10',
      },
      variants: {
        visual: {
          solid: {
            color: 'white',
          },
          outline: {
            borderColor: 'currentColor',
          },
        },
      },
    })
    const WithSize = styled(StyledButton, {
      base: {
        colorPalette: 'blue', // adding new key
      },
      variants: {
        size: {
          // new variant
          sm: { px: '2', fontSize: '12px' },
          lg: { px: '8', fontSize: '24px' },
        },
      },
    })
    const WithOverrides = styled(WithSize, {
      base: {
        borderWidth: '4px', // adding new key
        h: '20', // overriding 1st cva
      },
      variants: {
        visual: {
          outline: {
            // extend 1st cva
            colorPalette: 'red',
          },
        },
        size: {
          lg: { px: '12', fontSize: '32px' }, // override 2nd cva
          '2xl': { px: '20', fontSize: '40px' }, // add new one
        },
      },
    })

    const { container } = render(
      <WithOverrides visual="outline" size="lg">
        Click me
      </WithOverrides>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="fw_semibold h_20 color-palette_red bd-w_4px bd-c_currentColor px_12 fs_32px"
      >
        Click me
      </button>
    `)

    expect(
      render(
        <WithOverrides visual="solid" size="2xl">
          Click me
        </WithOverrides>,
      ).container.firstChild,
    ).toMatchInlineSnapshot(`
      <button
        class="fw_semibold h_20 color-palette_blue bd-w_4px c_white px_20 fs_40px"
      >
        Click me
      </button>
    `)
  })

  test('html props', () => {
    const { container } = render(
      <styled.div htmlWidth={123} height="123">
        Click me
      </styled.div>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <div
        class="h_123"
        width="123"
      >
        Click me
      </div>
    `)
  })
})

describe('styled factory - button recipe', () => {
  const Button = styled('button', buttonWithCompoundVariants)

  test('base styles', () => {
    const { container } = render(<Button>Click me</Button>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled"
      >
        Click me
      </button>
    `)
  })

  test('variant styles', () => {
    const { container } = render(<Button size="sm">Click me</Button>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled button--size_sm"
      >
        Click me
      </button>
    `)
  })

  test('compound variants', () => {
    const { container } = render(<Button visual="solid">Click me</Button>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_solid c_blue"
      >
        Click me
      </button>
    `)
  })

  test('custom className', () => {
    const { container } = render(
      <Button class="custom-btn" size="sm">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled button--size_sm custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('style prop', () => {
    const { container } = render(
      <Button class="custom-btn" mx="2">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled mx_2 custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('style prop with variant', () => {
    const { container } = render(
      <Button class="custom-btn" size="sm" mx="2">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled button--size_sm mx_2 custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('css prop', () => {
    const { container } = render(
      <Button class="custom-btn" css={{ color: 'red.100', fontSize: 'md' }}>
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled c_red.100 fs_md custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('css prop with variant', () => {
    const { container } = render(
      <Button class="custom-btn" size="sm" css={{ color: 'red.100', fontSize: 'md' }}>
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_unstyled button--size_sm c_red.100 fs_md custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('all together', () => {
    const { container } = render(
      <Button class="custom-btn" css={{ color: 'red.200', fontSize: 'xl' }} size="md" visual="outline" mx="2">
        Click me
      </Button>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(`
      <button
        class="button button--visual_outline button--size_md c_red.200 mx_2 fs_xl custom-btn"
      >
        Click me
      </button>
    `)
  })

  test('box pattern', () => {
    const { container } = render(<Box color="red.300">Click me</Box>)
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(
      `
      <div
        class="c_red.300"
      >
        Click me
      </div>
    `,
    )
  })

  test('stack pattern', () => {
    const { container } = render(
      <Stack direction="column" color="red.400">
        Click me
      </Stack>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(
      `
      <div
        class="d_flex flex-d_column gap_10px c_red.400"
      >
        Click me
      </div>
    `,
    )
  })

  test('array css prop', () => {
    const { container } = render(
      <styled.div css={[{ color: 'blue.300', backgroundColor: 'yellow.300' }, { backgroundColor: 'green.300' }]}>
        array css prop
      </styled.div>,
    )
    const { firstChild } = container as HTMLElement
    expect(firstChild).toMatchInlineSnapshot(
      `
      <div
        class="c_blue.300 bg-c_green.300"
      >
        array css prop
      </div>
    `,
    )
  })
})

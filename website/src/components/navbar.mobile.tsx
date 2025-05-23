'use client'
import { css } from '@/styled-system/css'
import { Center, HStack, Stack } from '@/styled-system/jsx'
import { center } from '@/styled-system/patterns'
import { ButtonIcon, Icon } from '@/theme/icons'
import { Dialog } from '@ark-ui/react/dialog'
import Link from 'next/link'
import { MenuIcon } from 'nextra/icons'
import { NavLink } from './nav-link'
import { ThemeSwitchIconButton } from './theme-switch-button'

export const MobileNavBar = () => {
  return (
    <HStack
      bg="bg.inverted"
      height="16"
      shadow="lg"
      py="5"
      px="4"
      borderRadius="md"
      zIndex="1"
      position="relative"
      justify="space-between"
    >
      <Link href="/" className={center({ flexShrink: '0' })}>
        <Icon icon="LogoWithText" />
      </Link>

      <HStack gap="4">
        <ThemeSwitchIconButton />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className={css({
                px: '1',
                py: '1',
                _hover: {
                  bg: 'bg.emphasized.hover'
                }
              })}
            >
              <MenuIcon />
            </button>
          </Dialog.Trigger>
          <Dialog.Backdrop
            className={css({
              position: 'fixed',
              inset: '0',
              bg: '#0f172acc',
              backdropFilter: 'auto',
              backdropBlur: 'sm'
            })}
          />
          <Dialog.Positioner
            className={css({
              position: 'absolute',
              zIndex: '10',
              width: '320px',
              top: '6',
              right: '6'
            })}
          >
            <Dialog.Content
              className={css({
                padding: '6',
                bg: 'bg.inverted',
                rounded: 'lg',
                position: 'relative',
                width: 'full'
              })}
            >
              <Stack align="flex-start">
                <NavLink href="/docs">Docs</NavLink>
                <NavLink href="/learn">Learn</NavLink>
                <NavLink href="https://play.panda-css.com/" isExternal>
                  <HStack>
                    <span>Playground</span>
                    <ButtonIcon icon="ExternalLink" />
                  </HStack>
                </NavLink>
                <NavLink href="https://github.com/chakra-ui/panda" isExternal>
                  <HStack>
                    <span>Github</span>
                    <ButtonIcon icon="ExternalLink" />
                  </HStack>
                </NavLink>
              </Stack>

              <Dialog.CloseTrigger
                className={css({ position: 'absolute', top: '4', right: '4' })}
              >
                <Center width="5" height="5" color="text.main">
                  <Icon
                    icon="Close"
                    className={css({ width: '1em', height: 'auto' })}
                  />
                </Center>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </HStack>
    </HStack>
  )
}

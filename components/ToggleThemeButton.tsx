'use client'

import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { useDarkMode } from '#/lib/use-dark-mode'
import styles from './styles.module.css'

type Props = {}

const ToggleThemeButton = () => {
    const [hasMounted, setHasMounted] = useState(false)
    const { isDarkMode, toggleDarkMode } = useDarkMode()

    const { systemTheme, theme, setTheme } = useTheme()

    const onToggleDarkMode = React.useCallback(
        (e: { preventDefault: () => void }) => {
            e.preventDefault()
            if (isDarkMode) {
                setTheme('light')
            } else {
                setTheme('dark')
            }
            toggleDarkMode()
        },
        [isDarkMode, setTheme, toggleDarkMode]
    )

    React.useEffect(() => {
        setHasMounted(true)
    }, [])
    return (
        <>
            {hasMounted && (
                <a
                    className={styles.toggleDarkMode}
                    href="#"
                    role="button"
                    onClick={onToggleDarkMode}
                    title="Toggle dark mode"
                >
                    {isDarkMode ? <IoSunnyOutline className='fill-blue-400' /> : <IoMoonSharp />}
                </a>
            )}
        </>
    )
}

export default ToggleThemeButton
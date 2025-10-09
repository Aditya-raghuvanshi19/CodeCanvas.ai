'use client';
import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const saved = localStorage.getItem('theme');
		const root = document.documentElement;

		if (saved === 'dark') {
			root.classList.add('dark');
			setTheme('dark');
		} else {
			root.classList.remove('dark');
			setTheme('light');
		}
	}, []);

	const toggleTheme = () => {
		const root = document.documentElement;
		if (theme === 'light') {
			root.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			setTheme('dark');
		} else {
			root.classList.remove('dark');
			localStorage.setItem('theme', 'light');
			setTheme('light');
		}
	};

	return (
		<>
			{/* <button onClick={toggleTheme}>
				 {theme === 'light' ? '🌙' : '☀️'}
			</button> */}
			{children}
		</>
	);
}
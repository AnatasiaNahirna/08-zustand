'use client'

import css from "./TagsMenu.module.css"
import Link from "next/link"
import { useState } from 'react';

export default function TagsMenu() {
    const tags = ["Work", "Personal", "Todo", "Shopping", "Meeting"];
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    return (
        <div className={css.menuContainer}>
            <button className={css.menuButton} onClick={toggle}> Notes ▾ </button>

            {isOpen && (
                <ul className={css.menuList}>
                    <li className={css.menuItem}>
                        <Link
                            href="/notes/filter/All"
                            className={css.menuLink}
                            onClick={close}
                        >
                        All notes
                        </Link>
                    </li>
                    {tags.map((tag) => (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={`/notes/filter/${tag}`}
                                className={css.menuLink}
                                onClick={close}
                            >
                            {tag}
                            </Link>
                        </li>
                        ))}
                </ul>
                )}
        </div>
    )
}
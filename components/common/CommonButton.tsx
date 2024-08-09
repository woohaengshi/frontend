'use client'

import { Box } from '@radix-ui/themes';
import styles from './CommonButton.module.css';
import Link from 'next/link';

export default function CommonButton({type, href, children}) {
    return (
        <>
            {
                type == "submit" ?
                <button type="submit" className={styles.btn_submit}>{children}</button> :
                <Link href={href} className={styles.btn_link}>{children}</Link>
            }
        </>        
    );
}
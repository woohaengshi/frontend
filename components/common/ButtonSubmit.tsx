'use client'

import { Box } from '@radix-ui/themes';
import styles from './ButtonSubmit.module.css';

export default function ButtonSubmit() {
    return (
        <Box mt="6" className={styles.btn_submit}>
            <button type="submit" >저장</button>
        </Box>
    );
}
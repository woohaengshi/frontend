'use client';

import { useEventStore } from '@/store/recordStore';
import { Card } from '@radix-ui/themes';
import { useState } from 'react';

export default function ModalInTabEdit() {
  const [changed, setChanged] = useState(false);
  // 기록 입력시 이벤트 감지
  const { setEventChange } = useEventStore();

  return (
    <div>
      <Card>
        <textarea
          placeholder="기록을 입력해주세요!"
          onChange={() => {
            if (!changed) {
              setChanged(true);
              setEventChange(true);
            }
          }}
        ></textarea>
      </Card>
    </div>
  );
}

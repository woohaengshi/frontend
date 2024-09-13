'use client';

import { useEventStore, useTextareaStore } from '@/store/recordStore';
import { Card } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export default function ModalInTabEdit() {
  const [changed, setChanged] = useState(false);
  // 기록 입력시 이벤트 감지
  const { setEventChange } = useEventStore();
  // 탭 이동시에도 회고 value 유지
  const { textValue, setTextValue } = useTextareaStore();

  useEffect(() => {
    setTextValue('');
  }, [setTextValue]);

  return (
    <div>
      <Card>
        <textarea
          placeholder="기록을 입력해주세요!"
          onChange={(e) => {
            if (!changed) {
              setChanged(true);
              setEventChange(true);
            }
            setTextValue(e.target.value);
          }}
          defaultValue={textValue}
        ></textarea>
      </Card>
    </div>
  );
}

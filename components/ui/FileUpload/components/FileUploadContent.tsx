import Icon from '../../Icon';
import { StateConfig } from '../utils/fileUploadConfig';

import s from '../FileUpload.module.scss';

interface FileUploadContentProps {
  config: StateConfig;
  progress: number;
  loadingProgress?: number;
  currentState: string;
}

export function FileUploadContent({
  config,
  progress,
  loadingProgress,
  currentState,
}: FileUploadContentProps) {
  return (
    <>
      {currentState === 'loading' && (
        <div className={s.loadingBar} style={{ height: `${loadingProgress || progress}%` }} />
      )}

      <div className={s.content}>
        <div className={s.iconWrapper}>
          <Icon icon={config.icon as any} color={config.iconColor as any} size='medium' />
        </div>

        <div className={s.textWrapper}>
          <h3 className={s.title}>{config.title}</h3>
          {config.subtitle && <p className={s.subtitle}>{config.subtitle}</p>}
        </div>
      </div>
    </>
  );
}

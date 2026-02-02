import { TextProps, variantTagMap } from './Text.types';
import clsx from 'clsx';
import React from 'react';

import s from './Text.module.scss';

function Text(props: TextProps) {
  const { variant, children, className, id, clamp, semanticType } = props;
  const weight = 'weight' in props ? props.weight : undefined;
  const color = 'color' in props ? props.color : undefined;

  const hasNestedText = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === Text,
  );

  const Tag = hasNestedText ? 'span' : variantTagMap[variant];

  const textClassNames = clsx(
    s[semanticType ? `${semanticType}-text-${variant}` : `text-${variant}`],
    weight ? s[`text-weight-${weight}`] : s[`text-weight-bold`],
    color && s[`text-color-${color}`],
    clamp && s[`textClamp-${clamp}`],
    className,
  );

  return (
    <Tag className={textClassNames} id={id}>
      {children}
    </Tag>
  );
}

export default Text;

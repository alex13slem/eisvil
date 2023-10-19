import {createWrapperAndAppendToBody} from '@/utils/helpers';
import {useLayoutEffect, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';

interface Props {
  children?: ReactNode;
  wrapperId?: string;
  className?: string;
}

const Portal = ({
  children,
  wrapperId = 'portal-wrapper',
  className = '',
}: Props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId, className);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (!wrapperElement || !children) return null;

  return createPortal(children, wrapperElement);
};

export default Portal;

import css from './style.module.css';
import {currentHeight as StoreСurrentHeight} from './store';
import {
  type HTMLAttributes,
  forwardRef,
  type MutableRefObject,
  useState,
  useEffect,
} from 'react';
import {useElementScroll} from '@/hooks';
import {cn} from '@/utils/helpers';

interface Props extends HTMLAttributes<HTMLDivElement> {
  isFixed?: boolean;
  isHide?: boolean;
}

const Header = forwardRef<HTMLDivElement, Props>(
  (
    {children, className, style, isFixed = false, isHide = false, ...props},
    root
  ) => {
    const header = (root as MutableRefObject<HTMLDivElement>) || null;
    const elemHeight = header.current?.offsetHeight ?? 0;
    const {top, reverseTop} = useElementScroll({elemHeight});
    const [currentTop, setCurrentTop] = useState<number>(top);

    useEffect(() => {
      if (!isFixed) {
        StoreСurrentHeight.set(reverseTop);
        setCurrentTop(top);
      }
    }, [reverseTop, top, isFixed]);

    useEffect(() => {
      if (isFixed) {
        if (isHide) {
          StoreСurrentHeight.set(0);
          setCurrentTop(-elemHeight);
        } else {
          StoreСurrentHeight.set(elemHeight);
          setCurrentTop(0);
        }
      }
    }, [isFixed, isHide, elemHeight, top]);

    return (
      <header
        style={{'--top': `${currentTop}px`}}
        ref={root}
        className={cn(css.root, className)}
        data-target="site-header"
        {...props}
      >
        {children}
      </header>
    );
  }
);

export default Header;

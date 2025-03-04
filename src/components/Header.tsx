import { useEffect } from 'react';
import { IconButton } from './IconButton';
import { Text } from './Text';
import { NavMenu } from './NavMenu';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import HamburgerIcon from '~/assets/hamburger__btn-icon.svg';
import { settingsSlice } from '~/store/settingsSlice';
import { Portal } from '~/ui/Portal';

export function Header() {
  const dispatch = useAppDispatch();
  const isNavMenuOpen = useAppSelector((state) => state.settings.isNavMenuOpen);

  useEffect(() => {
    if (isNavMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isNavMenuOpen]);

  const handleNavMenuOpen = () => {
    dispatch(settingsSlice.actions.setIsNavMenuOpen(true));
  };

  return (
    <>
      <Portal>{isNavMenuOpen && <NavMenu />}</Portal>
      <div className={'fixed min-h-20 left-0 top-0 bg-white w-full z-30 border-b'}>
        <div className={'global-container mx-auto px-4 py-0 flex items-center h-20 justify-center relative'}>
          <IconButton className={'absolute left-4 top-auto'} onClick={handleNavMenuOpen}>
            <img src={HamburgerIcon} alt="" />
          </IconButton>
          <Text>BESIDER</Text>
        </div>
      </div>
    </>
  );
}

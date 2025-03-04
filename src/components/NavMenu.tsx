import { IconButton } from './IconButton';
import { Text } from './Text';
import closeIcon from '~/assets/close__btn-icon.svg';
import { useAppDispatch } from '~/store/hooks';
import { settingsSlice } from '~/store/settingsSlice';

export function NavMenu() {
  const dispatch = useAppDispatch();

  const handleNavMenuClose = () => {
    dispatch(settingsSlice.actions.setIsNavMenuOpen(false));
  };

  return (
    <div className={'fixed z-40 left-0 top-0  min-h-screen w-full bg-[#ddd]'}>
      <div
        className={
          'global-container w-full bg-white min-h-screen mx-auto p-4 border relative flex flex-col justify-center'
        }
      >
        <IconButton className={'absolute top-4 right-4'} onClick={handleNavMenuClose}>
          <img src={closeIcon} alt="closeIcon" />
        </IconButton>
        <ul className={'flex flex-col gap-7'}>
          <li>
            <Text>SCIENCE</Text>
          </li>
          <li>
            <Text>GENERAL</Text>
          </li>
          <li>
            <Text>ENTERTAINMENT</Text>
          </li>
          <li>
            <Text>TECHNOLOGY</Text>
          </li>
          <li>
            <Text>BUSINESS</Text>
          </li>
          <li>
            <Text>HEALTH</Text>
          </li>
          <li>
            <Text>SPORTS</Text>
          </li>
        </ul>
      </div>
    </div>
  );
}

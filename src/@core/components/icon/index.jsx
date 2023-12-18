import { Icon } from '@iconify/react';

const IconComponent = ({ icon, ...props }) => {
  return <Icon icon={icon} fontSize="1.375rem" {...props} />;
};

export default IconComponent;

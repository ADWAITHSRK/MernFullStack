import { Alert } from 'antd';
import PropTypes from 'prop-types';

const Message = ({ variant, children }) => {
  return (
    <Alert
      type={variant}
      className="mb-4 p-4 rounded-lg font-medium [&>.ant-alert-icon]:mt-1"
      showIcon
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};
Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Message;

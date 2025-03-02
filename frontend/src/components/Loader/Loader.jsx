import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className="w-[100px] h-[100px] block m-auto">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 100 }} />}
        role="status"
      />
    </div>
  );
};

export default Loader;
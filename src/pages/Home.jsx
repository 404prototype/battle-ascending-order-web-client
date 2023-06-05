import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.prompt('아이디를 입력해주세요.');
    if (!id) {
      return;
    }

    navigate(`/room/${encodeURIComponent(id)}`);
  });
  return <div></div>;
};

export default Home;

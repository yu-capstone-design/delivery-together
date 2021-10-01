import React, { useEffect, useState } from 'react';

const MatchingDetail = (props) => {
  const username = props.match.params.username;

  const [matching, setMatching] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/matching/' + username)
      .then((res) => res.json())
      .then((res) => {
        setMatching(res);
      });
  }, []);

  console.log(matching);

  return <div>{matching.username}</div>;
};

export default MatchingDetail;

function StarRating({ rating, setRating }) {

  const handleEnter = (index) => {
    setRating(index + 1);
  };

  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => (
        <span
          inputType="radio"
          key={index}
          className={`star ${index < rating ? "on" : "off"}`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleEnter(index)}
        >
          ★
        </span>
      )
      )
      }
    </div >
  )
}

export default StarRating;

function BreadCrumps(props) {
  const step = props.step;
  return (
    <div className='bread-crumps'>
      <div className='wrapper'>
        <div className='bread-crumps__nav'>
          Registration / {step}
        </div>
      </div>
    </div>
  );
}

export default BreadCrumps;


import CountdownContainer from '#/components/CountdownContainer';
import MapChart from '#/components/MapChart';


export default async function Home() {
  console.log({todo:['stimulate your own result', 'compare that to others', 'save it', 'share it']})
  return (
    <div className="">
        <CountdownContainer/>
              <MapChart />
    </div>
  );
}

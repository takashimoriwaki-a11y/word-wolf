import mascotVillager from '../assets/mascot-villager.jpg';
import mascotWolf from '../assets/mascot-wolf.jpg';

export function Mascots() {
  return (
    <div className="mascots" aria-hidden="true">
      <img className="mascot mascot-villager" src={mascotVillager} alt="" />
      <img className="mascot mascot-wolf" src={mascotWolf} alt="" />
    </div>
  );
}

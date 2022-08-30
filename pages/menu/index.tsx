import {NextPage} from "next";
import Navigation from "@/core/presenter/Layout/Navigation/Navigation";

const MenuPage: NextPage = () => {
	return <>
		<div className="my:hidden bg-brown">
			<Navigation/>
		</div>
	</>
};

export default MenuPage;
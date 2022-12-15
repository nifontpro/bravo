import {TypeMaterialIconName} from "@/core/model/icon.types";

export interface IMenuItem {
	icon: 'main' | 'company' | 'help' | 'rating' | 'statistic' | 'awards'
	title: string
	link: string
}

export interface IMenu {
	title: string
	items: IMenuItem[]
}

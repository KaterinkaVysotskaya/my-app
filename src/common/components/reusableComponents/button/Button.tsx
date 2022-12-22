import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import { ButtonWrap } from './styles';

type StylesType = { width?: string, buttonName: string }
type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & StylesType;

export const Button: FC<ButtonProps> = (props) => {
    return (
        <ButtonWrap width={props.width}>
            <button {...props}>{props.buttonName}</button>
        </ButtonWrap>
    )
}

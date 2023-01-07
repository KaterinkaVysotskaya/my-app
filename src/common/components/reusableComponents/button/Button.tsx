import {ButtonHTMLAttributes, DetailedHTMLProps, FC} from "react";
import { ButtonWrap } from './styles';

type StylesType = { width?: string, buttonname: string }
type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & StylesType;

export const Button: FC<ButtonProps> = (props) => {
    return (
        <ButtonWrap width={props.width}>
            <button {...props}>{props.buttonname}</button>
        </ButtonWrap>
    )
}

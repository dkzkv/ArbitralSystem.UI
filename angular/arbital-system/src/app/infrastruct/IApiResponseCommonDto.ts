export interface IApiResponseCommonDto<TResult> {
   ok: boolean;
   errors?: Array<IValidateErrorItemDto>;
   data?: TResult;
}

export interface IValidateErrorItemDto {
   key: string;
   message: string;
}


export interface IApiResponseDto {
   ok: boolean;
   errors?: Array<IValidateErrorItemDto>;
}

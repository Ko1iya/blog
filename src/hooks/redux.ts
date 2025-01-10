import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { RootState } from '@/store/reducers';

const useAppDispatch = () => useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };

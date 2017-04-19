import * as _ from 'lodash';
import * as React from 'react';
import {utils} from 'ts/utils/utils';
import {constants} from 'ts/utils/constants';
import {Direction, SideToAssetToken, Side, AssetToken, TokenBySymbol} from 'ts/types';
import {Party} from 'ts/components/ui/party';
import {Ox} from 'ts/utils/Ox';

const PRECISION = 5;
const IDENTICON_DIAMETER = 60;

interface TradeHistoryItemProps {
    orderTakerAddress: string;
    orderMakerAddress: string;
    sideToAssetToken: SideToAssetToken;
    tokenBySymbol: TokenBySymbol;
}

interface TradeHistoryItemState {}

export class TradeHistoryItem extends React.Component<TradeHistoryItemProps, TradeHistoryItemState> {
    public render() {
        const depositAssetToken = this.props.sideToAssetToken[Side.deposit];
        const receiveAssetToken = this.props.sideToAssetToken[Side.receive];
        const depositToken = this.props.tokenBySymbol[depositAssetToken.symbol];
        const receiveToken = this.props.tokenBySymbol[receiveAssetToken.symbol];
        return (
            <div>
                <div className="clearfix">
                    <div className="col col-4 center">
                        <Party
                            label="Maker"
                            address={this.props.orderMakerAddress}
                            identiconDiameter={IDENTICON_DIAMETER}
                        />
                    </div>
                    <div className="col col-4 center" style={{paddingTop: 25}}>
                        <div style={{paddingBottom: 2}}>
                            {this.renderAmount(depositAssetToken, depositToken.decimals)}
                        </div>
                        <div className="relative mx-auto" style={{width: 51, height: 38}}>
                            <div className="absolute" style={{top: -14, left: 1}}>
                                <i style={{fontSize: 65}} className="zmdi zmdi-swap" />
                            </div>
                        </div>
                        <div style={{paddingTop: 2}}>
                            {this.renderAmount(receiveAssetToken, receiveToken.decimals)}
                        </div>
                    </div>
                    <div className="col col-4 center">
                        <Party
                            label="Taker"
                            address={this.props.orderTakerAddress}
                            identiconDiameter={IDENTICON_DIAMETER}
                        />
                    </div>
                </div>
            </div>
        );
    }
    private renderAmount(assetToken: AssetToken, decimals: number) {
        const unitAmount = Ox.toUnitAmount(assetToken.amount, decimals);
        return (
            <div style={{fontSize: 13}}>
                {unitAmount.toNumber().toFixed(PRECISION)} {assetToken.symbol}
            </div>
        );
    }
}
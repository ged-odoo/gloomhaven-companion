import { Component, xml } from "@odoo/owl";

export function statusString(statusObj) {
  const keys = [];
  for (let k in statusObj) {
    if (statusObj[k]) {
      keys.push(k);
    }
  }
  if (!keys.length) {
    return "";
  }
  const mapping = {
    poisoned: "poison",
    wound: "blessure",
    confusion: "confusion",
    immobilisation: "immobilisation",
    stunned: "étourdissement",
    renforced: "renforcement",
    disarmed: "désarmé",
  };

  return keys.map((k) => mapping[k]).join(", ");
}

export class StatusEditor extends Component {
  static template = xml`
        <t t-set="status" t-value="props.status"/>
        <div 
          class="border-radius-2 text-smallcaps text-center p-1 " 
          t-att-class="{'bg-darker text-bold': status.poisoned}"
          t-on-click="() => status.poisoned = !status.poisoned"
        >
          poison
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.wound}"
          t-on-click="() => status.wound = !status.wound"
        >
          blessure
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.confusion}"
          t-on-click="() => this.toggleStatus('confusion')"
        >
          confusion
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.immobilisation}"
          t-on-click="() => this.toggleStatus('immobilisation')"
        >
          immobilisation
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.stunned}"
          t-on-click="() => this.toggleStatus('stunned')"
        >
          étourdissement
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.disarmed}"
          t-on-click="() => this.toggleStatus('disarmed')"
        >
          désarmement
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.renforced}"
          t-on-click="() => this.toggleStatus('renforced')"
        >
          renforcement
        </div>`;

  toggleStatus(effect) {
    if (this.props.status[effect]) {
      this.props.status[effect] = 0;
    } else {
      this.props.status[effect] = this.props.isActive ? 2 : 1;
    }
  }
}

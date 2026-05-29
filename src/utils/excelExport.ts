/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as XLSX from 'xlsx';
import { Registration, Competition } from '../types';
import { OFFICIAL_COMPETITIONS } from './mockData';

export function exportRegistrationsToExcel(registrations: Registration[]) {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  OFFICIAL_COMPETITIONS.forEach((comp) => {
    // Filter registrations matching this competition
    const compRegs = registrations.filter((reg) => reg.competitionId === comp.id);

    // Map into rows
    const rows = compRegs.map((reg) => ({
      'Registration ID': reg.id,
      'Competition': `${comp.name} (${comp.id})`,
      'Team Name': reg.teamName,
      'Institution': reg.institution,
      'Team Leader': reg.teamLeader,
      'WhatsApp': reg.whatsapp,
      'Members': reg.members.join(', '),
      'Registration Date': new Date(reg.regDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      'Payment Status': reg.paymentStatus,
    }));

    // If empty, put a placeholder row or just the headers
    let ws: XLSX.WorkSheet;
    if (rows.length === 0) {
      // Just headers
      ws = XLSX.utils.json_to_sheet([], {
        header: [
          'Registration ID',
          'Competition',
          'Team Name',
          'Institution',
          'Team Leader',
          'WhatsApp',
          'Members',
          'Registration Date',
          'Payment Status',
        ],
      });
      // Add a note row indicating no registrants yet
      XLSX.utils.sheet_add_aoa(ws, [['No teams registered for this track yet']], { origin: "A2" });
    } else {
      ws = XLSX.utils.json_to_sheet(rows);
    }

    // Adjust column widths for ultra premium polish
    const colWidths = [
      { wch: 15 }, // Registration ID
      { wch: 30 }, // Competition name
      { wch: 25 }, // Team Name
      { wch: 30 }, // Institution
      { wch: 20 }, // Team Leader
      { wch: 18 }, // WhatsApp
      { wch: 35 }, // Members
      { wch: 22 }, // Registration Date
      { wch: 18 }, // Payment Status
    ];
    ws['!cols'] = colWidths;

    // Append sheet to workbook under the competition code
    XLSX.utils.book_append_sheet(wb, ws, comp.id);
  });

  // Write and trigger download
  XLSX.writeFile(wb, 'eric_registrations.xlsx');
}

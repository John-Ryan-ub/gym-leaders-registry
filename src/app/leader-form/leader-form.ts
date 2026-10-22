import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GymLeaders } from '../gym-leaders';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-leader-form',
  styleUrl: './leader-form.css',
  templateUrl: './leader-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderForm implements OnInit{
  private formBuilder = inject(FormBuilder);
  leadersService = inject(GymLeaders);
  editingId = signal<string | null>(null);

  leadersForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    region: ['', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
    motto: ['', Validators.required, Validators.maxLength(150)],
  });

  ngOnInit() {
    this.leadersService.fetchLeaders();
  }

  deleteLeaders(id: string){
    if(confirm("Are you sure you want to release this Leaders?")){
      this.leadersService.deleteLeaders(id);
    }
    this.leadersService.fetchLeaders();
  }

  startEdit(Leaders: any){
    this.editingId.set(Leaders._id);
    this.leadersForm.patchValue(Leaders);
  }

  cancelEdit(){
    this.editingId.set(null);
    this.leadersForm.reset();
  }

  onSubmit() {
    if (this.leadersForm.invalid) return;

    const data = this.leadersForm.getRawValue();
    const id = this.editingId();

    if(id){
      this.leadersService.updateLeaders(id, data).subscribe({
        next: () => {
          this.leadersService.fetchLeaders();
          this.cancelEdit();
        }, 
        error: (err) => console.error('Update Failed!', err)
      })
    } else {
      this.leadersService.saveLeaders(data).subscribe({
      next: () => {
        this.leadersService.fetchLeaders();
        this.leadersForm.reset();
      },
      error: (err) => console.error('Save failed', err)
      });
    }
  }
}
